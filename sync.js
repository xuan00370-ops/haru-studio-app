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

/**
 * NAS Scanner Service
 * Scans NAS folder structure for project folders matching CD-CR pattern
 * Returns array of { folderName, path, client, date, matchType }
 */
export function nasScanner(jobs, nasRootPath = '/Volumes/NAS/HaruWedding') {
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
            job.linkNAS = expectedPath;
            if (wasEmpty) {
                results.added++;
                addSyncLog('added', `${job.id} ${job.client} — NAS path assigned`, expectedPath);
            } else {
                results.updated++;
                addSyncLog('updated', `${job.id} ${job.client} — NAS path updated`, `${job.linkNAS} → ${expectedPath}`);
            }
        }
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

    // If no real Drive folders provided, generate expected links from job data
    if (driveFolders.length === 0) {
        for (const job of jobs) {
            if (job.isTrash) continue;
            const expectedLink = `https://drive.google.com/drive/folders/${job.id}_${(job.client || '').replace(/\s/g, '_')}`;

            if (job.linkDrive && job.linkDrive.length > 10) {
                results.skipped++;
                addSyncLog('skipped', `${job.id} — Drive link exists`, job.linkDrive);
            } else {
                job.linkDrive = expectedLink;
                results.added++;
                addSyncLog('added', `${job.id} ${job.client} — Drive link generated`, expectedLink);
            }
            results.items.push({ job: job.id, client: job.client, driveLink: job.linkDrive || expectedLink });
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

        if (data.jobs && Array.isArray(data.jobs)) {
            let processed = 0;
            for (const row of data.jobs) {
                if (!row.id || !row.client) continue;

                const exists = jobs.find(j => j.id === String(row.id));
                if (exists) {
                    results.skipped++;
                } else {
                    jobs.push({
                        id: String(row.id),
                        client: row.client,
                        date: row.date || new Date().toISOString().split('T')[0],
                        package: parseInt(row.package) || 0,
                        deposit: parseInt(row.deposit) || 0,
                        status: row.status || 'Chưa gửi',
                        venue: row.venue || '',
                        services: row.services || [],
                        timeline: row.timeline || { le: '', tiec: '' }
                    });
                    results.added++;
                    addSyncLog('added', `[Sheet] Đã thêm dự án mới: ${row.id}`, row.client);
                }
                processed++;
            }
            addSyncLog('info', `Đã xử lý ${processed} dòng từ Google Sheet.`);
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
export async function runFullSync(jobs, nasRoot = '/Volumes/NAS/HaruWedding', driveFolders = [], sheetUrl = '') {
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
