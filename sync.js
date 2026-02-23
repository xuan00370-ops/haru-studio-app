/**
 * sync.js — Haru Studio Sync Pipeline
 * NAS Scanner, Drive Scanner, Merge Service, Sync Logs
 */

// Sync Log Store
const syncLogs = [];

function addSyncLog(type, message, detail = '') {
    syncLogs.push({
        id: Date.now(),
        type, // 'added' | 'updated' | 'skipped' | 'error' | 'info'
        message,
        detail,
        timestamp: new Date().toLocaleString('vi-VN')
    });
}

export function getSyncLogs() {
    return syncLogs;
}

export function clearSyncLogs() {
    syncLogs.length = 0;
}

function updateCustomerLink(job) {
    // Ưu tiên Drive cho khách; fallback NAS nếu chưa có Drive
    const next = (job.linkDrive && String(job.linkDrive).trim()) || (job.linkNAS && String(job.linkNAS).trim()) || '';
    if (next && job.linkCustomer !== next) {
        job.linkCustomer = next;
    }
}

/**
 * NAS Scanner Service
 * Scans NAS folder structure for project folders matching CD-CR pattern
 * Returns array of { folderName, path, client, date, matchType }
 */
export function nasScanner(jobs, nasRootPath = '/Volumes/HARUwedding') {
    addSyncLog('info', `Bắt đầu quét NAS: ${nasRootPath}`);
    const results = { added: 0, updated: 0, skipped: 0, errors: 0, items: [] };

    for (const job of jobs) {
        if (job.isTrash) { results.skipped++; continue; }

        // Build expected NAS path: /root/YYYY-MM/CD-CR_ClientName
        const d = new Date(job.date);
        const monthFolder = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const safeName = (job.client || '').replace(/[^a-zA-Z0-9À-ỹ\s]/g, '').trim();
        const expectedPath = `${nasRootPath}/${monthFolder}/${job.id}_${safeName}`;

        if (job.linkNAS && job.linkNAS === expectedPath) {
            results.skipped++;
            addSyncLog('skipped', `${job.id} — NAS path unchanged`, expectedPath);
        } else {
            const wasEmpty = !job.linkNAS;
            const oldPath = job.linkNAS || '';
            job.linkNAS = expectedPath;
            if (wasEmpty) {
                results.added++;
                addSyncLog('added', `${job.id} ${job.client} — NAS path assigned`, expectedPath);
            } else {
                results.updated++;
                addSyncLog('updated', `${job.id} ${job.client} — NAS path updated`, `${oldPath} → ${expectedPath}`);
            }
        }
        updateCustomerLink(job);
        results.items.push({ job: job.id, client: job.client, nasPath: expectedPath });
    }

    addSyncLog('info', `NAS scan hoàn tất: +${results.added} added, ~${results.updated} updated, =${results.skipped} skipped`);
    return results;
}

/**
 * Drive Scanner Service
 * Maps Google Drive folder IDs to jobs by CD-CR or client+date fallback
 * Returns array of { folderId, folderName, matchedJob, matchType }
 */
export function driveScanner(jobs, driveFolders = []) {
    addSyncLog('info', `Bắt đầu quét Drive: ${driveFolders.length} folders`);
    const results = { added: 0, updated: 0, skipped: 0, errors: 0, items: [] };

    // If no real Drive folders provided, keep existing links or create searchable Drive query links
    if (driveFolders.length === 0) {
        for (const job of jobs) {
            if (job.isTrash) continue;
            const query = encodeURIComponent(`${job.id} ${(job.client || '').trim()}`.trim());
            const fallbackLink = `https://drive.google.com/drive/search?q=${query}`;

            if (job.linkDrive && job.linkDrive.length > 10) {
                results.skipped++;
                addSyncLog('skipped', `${job.id} — Drive link exists`, job.linkDrive);
            } else {
                job.linkDrive = fallbackLink;
                results.added++;
                addSyncLog('added', `${job.id} ${job.client} — Drive search link generated`, fallbackLink);
            }
            updateCustomerLink(job);
            results.items.push({ job: job.id, client: job.client, driveLink: job.linkDrive || fallbackLink });
        }
    } else {
        // Real Drive folder matching by CD-CR then client+date
        for (const folder of driveFolders) {
            const folderName = folder.name || '';

            // Try match by CD-CR (job.id)
            let matched = jobs.find(j => !j.isTrash && folderName.includes(j.id));

            // Fallback: match by client + date
            if (!matched) {
                matched = jobs.find(j => {
                    if (j.isTrash) return false;
                    const clientMatch = j.client && folderName.toLowerCase().includes(j.client.toLowerCase());
                    const dateMatch = j.date && folderName.includes(j.date.replace(/-/g, ''));
                    return clientMatch || dateMatch;
                });
            }

            if (matched) {
                const driveLink = `https://drive.google.com/drive/folders/${folder.id}`;
                if (matched.linkDrive === driveLink) {
                    results.skipped++;
                    addSyncLog('skipped', `${matched.id} — Drive link unchanged`);
                } else {
                    const wasEmpty = !matched.linkDrive;
                    matched.linkDrive = driveLink;
                    if (wasEmpty) {
                        results.added++;
                        addSyncLog('added', `${matched.id} ${matched.client} — Drive linked`, driveLink);
                    } else {
                        results.updated++;
                        addSyncLog('updated', `${matched.id} ${matched.client} — Drive updated`, driveLink);
                    }
                }
                updateCustomerLink(matched);
                results.items.push({ job: matched.id, client: matched.client, folder: folderName, driveLink });
            } else {
                results.errors++;
                addSyncLog('error', `Drive folder unmatched: ${folderName}`, `id: ${folder.id}`);
            }
        }
    }

    addSyncLog('info', `Drive scan hoàn tất: +${results.added}, ~${results.updated}, =${results.skipped}, ✗${results.errors}`);
    return results;
}

/**
 * Merge Service — combines NAS + Drive scan results
 * Updates job.linkNAS and job.linkDrive fields
 * Returns unified summary
 */
async function googleSheetScanner(jobs, sheetUrl) {
    if (!sheetUrl || (!sheetUrl.includes('script.google.com') && !sheetUrl.includes('script.googleusercontent.com'))) {
        addSyncLog('info', 'Bỏ qua Google Sheet Sync (Link không phải Apps Script API hợp lệ)');
        return { added: 0, updated: 0, skipped: 0, errors: 0 };
    }

    addSyncLog('info', `Đang tải dữ liệu từ Google Sheet...`);
    const results = { added: 0, updated: 0, skipped: 0, errors: 0 };
    try {
        const response = await fetch(sheetUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const data = await response.json();

        // ─── NEW FORMAT: { jobs: [...], eventDays: [...] } ───
        if (data.jobs && Array.isArray(data.jobs)) {
            // Build eventDays lookup by job ID
            const eventDaysMap = {};
            if (data.eventDays && Array.isArray(data.eventDays)) {
                for (const day of data.eventDays) {
                    if (!day.jobId) continue;
                    const key = String(day.jobId);
                    if (!eventDaysMap[key]) eventDaysMap[key] = [];

                    // Parse services from comma-separated strings
                    const svcNames = (day.services || '').split(',').map(s => s.trim()).filter(Boolean);
                    const svcStaffs = (day.staff || '').split(',').map(s => s.trim());
                    const svcCosts = (day.costs || '').split(',').map(s => parseInt(s.trim()) || 0);

                    const services = svcNames.map((name, i) => ({
                        service: name,
                        staff: svcStaffs[i] || 'Chưa xếp',
                        cost: svcCosts[i] || 0,
                        edit: 0,
                        paid: false,
                        date: day.date || ''
                    }));

                    eventDaysMap[key].push({
                        dayLabel: day.dayLabel || '',
                        date: day.date || '',
                        boyHouse: day.boyHouse || '',
                        girlHouse: day.girlHouse || '',
                        venue: day.venue || '',
                        timeline: {
                            le_sang: !!(day.leSang),
                            le: day.leSang || '05:00',
                            tiec_trua: !!(day.tiecTrua),
                            tiec_trua_time: day.tiecTrua || '11:00',
                            tiec_toi: !!(day.tiecToi),
                            tiec: day.tiecToi || '18:00'
                        },
                        categories: svcNames.filter((v, i, a) => a.indexOf(v) === i),
                        services: services
                    });
                }
            }

            let processed = 0;
            for (const row of data.jobs) {
                if (!row.id || !row.client) continue;
                const jobId = String(row.id);

                const exists = jobs.find(j => j.id === jobId);
                const dayData = eventDaysMap[jobId] || [];

                // Merge all services from all days
                const allServices = dayData.flatMap(d => d.services || []);

                // Build eventDays (without embedded services)
                const eventDays = dayData.map(d => ({
                    dayLabel: d.dayLabel,
                    date: d.date,
                    boyHouse: d.boyHouse,
                    girlHouse: d.girlHouse,
                    venue: d.venue,
                    timeline: d.timeline,
                    categories: d.categories
                }));

                if (exists) {
                    let changed = false;
                    // Update fields from sheet if provided
                    if (row.client && row.client !== exists.client) { exists.client = row.client; changed = true; }
                    if (row.phone && row.phone !== exists.phone) { exists.phone = String(row.phone); changed = true; }
                    if (row.eventType && row.eventType !== exists.eventType) { exists.eventType = row.eventType; changed = true; }
                    if (row.package && parseInt(row.package) !== exists.package) { exists.package = parseInt(row.package) || 0; changed = true; }
                    if (row.deposit !== undefined && parseInt(row.deposit) !== exists.deposit) { exists.deposit = parseInt(row.deposit) || 0; changed = true; }
                    if (row.status && row.status !== exists.status) { exists.status = row.status; changed = true; }
                    if (row.linkDrive && row.linkDrive !== exists.linkDrive) { exists.linkDrive = row.linkDrive; changed = true; }
                    if (row.linkNAS && row.linkNAS !== exists.linkNAS) { exists.linkNAS = row.linkNAS; changed = true; }

                    // Update eventDays if sheet has them
                    if (eventDays.length > 0) {
                        exists.eventDays = eventDays;
                        exists.date = eventDays[0].date || exists.date;
                        exists.venue = eventDays[0].venue || exists.venue;
                        exists.timeline = eventDays[0].timeline || exists.timeline;
                        changed = true;
                    }

                    // Update services if sheet has them
                    if (allServices.length > 0) {
                        exists.services = allServices;
                        changed = true;
                    }

                    if (changed) {
                        results.updated++;
                        addSyncLog('updated', `[Sheet] Cập nhật: ${jobId} ${row.client}`, `${eventDays.length} ngày, ${allServices.length} dịch vụ`);
                    } else {
                        results.skipped++;
                    }
                } else {
                    // Create new job
                    const firstDay = eventDays[0] || {};
                    const newJob = {
                        id: jobId,
                        jobNo: jobs.filter(j => !j.isTrash).length + 1,
                        client: row.client,
                        date: firstDay.date || row.date || new Date().toISOString().split('T')[0],
                        phone: String(row.phone || ''),
                        eventType: row.eventType || 'Wedding',
                        package: parseInt(row.package) || 0,
                        deposit: parseInt(row.deposit) || 0,
                        status: row.status || 'Chưa gửi',
                        isTrash: false,
                        visibility: true,
                        venue: firstDay.venue || row.venue || '',
                        timeline: firstDay.timeline || { le_sang: false, le: '05:00', tiec_trua: false, tiec_trua_time: '11:00', tiec_toi: false, tiec: '18:00' },
                        eventDays: eventDays.length > 0 ? eventDays : [],
                        services: allServices.length > 0 ? allServices : (row.services || []),
                        linkNAS: row.linkNAS || '',
                        linkDrive: row.linkDrive || '',
                        linkCustomer: '',
                        notes: row.notes || ''
                    };
                    jobs.push(newJob);
                    results.added++;
                    addSyncLog('added', `[Sheet] Thêm mới: ${jobId} ${row.client}`, `${eventDays.length} ngày, ${allServices.length} dịch vụ`);
                }
                processed++;
            }
            addSyncLog('info', `Đã xử lý ${processed} dự án từ Google Sheet.`);
        } else {
            throw new Error('API format không đúng. Cần trả về { jobs: [...] }');
        }
    } catch (err) {
        addSyncLog('error', `Sheet Sync Lỗi: ${err.message}`, sheetUrl);
        results.errors++;
    }
    return results;
}

/**
 * Merge Service — combines Sheet + NAS + Drive scan results
 * Updates job.linkNAS and job.linkDrive fields
 * Returns unified summary
 */
export async function runFullSync(jobs, nasRoot = '/Volumes/HARUwedding', driveFolders = [], sheetUrl = '') {
    clearSyncLogs();
    addSyncLog('info', '═══ BẮT ĐẦU SYNC TOÀN BỘ ═══');

    const sheetResult = await googleSheetScanner(jobs, sheetUrl);
    const nasResult = nasScanner(jobs, nasRoot);
    const driveResult = driveScanner(jobs, driveFolders);

    const summary = {
        total: jobs.filter(j => !j.isTrash).length,
        nasAdded: nasResult.added,
        nasUpdated: nasResult.updated,
        driveAdded: driveResult.added,
        driveUpdated: driveResult.updated,
        sheetAdded: sheetResult.added,
        skipped: nasResult.skipped + driveResult.skipped + sheetResult.skipped,
        errors: nasResult.errors + driveResult.errors + sheetResult.errors,
        timestamp: new Date().toLocaleString('vi-VN')
    };

    const totalAdded = summary.nasAdded + summary.driveAdded + summary.sheetAdded;
    const totalUpdated = summary.nasUpdated + summary.driveUpdated;
    addSyncLog('info', `═══ SYNC HOÀN TẤT: ${summary.total} dự án, +${totalAdded} added, ~${totalUpdated} updated ═══`);

    return summary;
}

/**
 * Customer link generator
 * Creates shareable links for customer deliverables
 */
export function generateCustomerLinks(jobs) {
    addSyncLog('info', 'Generating customer links...');
    let count = 0;
    for (const job of jobs) {
        if (job.isTrash || job.linkCustomer) continue;
        job.linkCustomer = `https://gallery.haruweddingfilm.com/${job.id}`;
        count++;
        addSyncLog('added', `${job.id} — Customer link`, job.linkCustomer);
    }
    addSyncLog('info', `Customer links: ${count} generated`);
    return count;
}
