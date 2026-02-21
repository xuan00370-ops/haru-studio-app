const fs = require('fs');
const { parse } = require('csv-parse/sync');

// Các GID của từng sheet tháng (từ tháng 3 đến tháng 7)
const GIDS = [
    '878965634',  // Tháng 3
    '2086131536', // Tháng 4
    '1100114477', // Tháng 5
    '275471803',  // Tháng 6
    '1726909837'  // Tháng 7
];
const BASE_URL = 'https://docs.google.com/spreadsheets/d/1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM/export?format=csv&gid=';

// Firebase Database URL (sẽ fetch từ cấu hình hiện tại nếu có)
const DB_URL = 'haru-studio-14a93-default-rtdb.firebaseio.com'; // Ví dụ, hãy kiểm tra lại bằng fetch
// Nhưng khoan, tôi cần URL chính xác. Sẽ điền nó sau bằng việc đọc file firebase.js hoặc gọi API.

function parseCurrency(str) {
    if (!str) return 0;
    return parseInt(str.toString().replace(/\D/g, '')) || 0;
}

function extractPhone(str) {
    if (!str) return '';
    const match = str.match(/(0\d{9,10})/);
    return match ? match[0] : '';
}

function parseDate(str) {
    if (!str || !str.trim()) return null;
    // Thường có dạng "08/03/2026\nchụp thôi nôi"
    const firstLine = str.split('\n')[0].trim();
    const parts = firstLine.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(firstLine)) return firstLine;
    return null;
}

function generateClientId(clientName) {
    return 'CUST-' + Buffer.from(encodeURIComponent(clientName)).toString('base64').replace(/=/g, '').substring(0, 12);
}

function generateJobId() {
    return 'JOB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

async function run() {
    let allJobs = [];

    for (const gid of GIDS) {
        console.log(`Downloading GID ${gid}...`);
        const res = await fetch(BASE_URL + gid);
        const text = await res.text();

        const records = parse(text, {
            skip_empty_lines: true,
            relax_column_count: true
        });

        // Bỏ qua dòng Header
        const dataRows = records.slice(1);

        let currentJob = null;

        for (const row of dataRows) {
            // Cột 2 là CD-CR (Tên Khách)
            const clientName = (row[2] || '').trim();
            const parsedDate = parseDate(row[1]);

            // Nếu có tên khách VÀ CÓ NGÀY HỢP LỆ -> Dòng bắt đầu của 1 Job mới
            if (clientName && clientName !== '' && clientName !== 'CD - CR' && parsedDate) {
                currentJob = {
                    id: generateJobId(),
                    client: clientName,
                    phone: extractPhone(row[3]),
                    date: parsedDate,
                    venue: (row[4] || '').trim(),
                    eventType: row[1] ? row[1].split('\n').length > 1 ? row[1].split('\n').slice(1).join(' ').trim() : '' : '',
                    package: parseCurrency(row[10]),
                    deposit: parseCurrency(row[11]),
                    notes: row[12] || '',
                    services: [],
                    status: 'Chưa bắt đầu', // Trạng thái mặc định
                    isTrash: false,
                    createdAt: new Date().toISOString()
                };
                allJobs.push(currentJob);
            }

            // Dù là dòng mới hay dòng merge, lấy thông tin dịch vụ
            if (currentJob) {
                const serviceName = (row[5] || '').trim();
                if (serviceName) {
                    currentJob.services.push({
                        id: Math.random().toString(36).substr(2, 6),
                        service: serviceName,
                        staff: (row[6] || '').split(',').map(s => s.trim()).filter(s => s),
                        cost: parseCurrency(row[7]),
                        note: '',
                        isDone: false
                    });
                }
            }
        }
    }

    console.log(`Parsed ${allJobs.length} real jobs from Google Sheets.`);

    // 2. Tái tạo danh sách Khách hàng (CRM)
    const clientsMap = new Map();
    for (const j of allJobs) {
        if (!clientsMap.has(j.client)) {
            clientsMap.set(j.client, {
                id: generateClientId(j.client),
                name: j.client,
                phone: j.phone || '',
                createdAt: j.createdAt
            });
        }
        // Cập nhật SĐT nếu job sau có SĐT mà job trước không có
        if (!clientsMap.get(j.client).phone && j.phone) {
            clientsMap.get(j.client).phone = j.phone;
        }
    }
    const allClients = Array.from(clientsMap.values());
    console.log(`Generated ${allClients.length} clients.`);

    // 3. Đọc dữ liệu cũ từ file local storage dump (hoặc fetch trực tiếp)
    // Để an toàn, ghi ra file JSON cục bộ trước khi upload
    const payload = {
        jobs: allJobs,
        clients: allClients,
        history: [], // Xóa sạch lịch sử demo
        financeMetadata: {}, // Xóa sạch tài chính demo
        manualTransactions: [] // Xóa sạch giao dịch tay
    };

    fs.writeFileSync('new_state.json', JSON.stringify(payload, null, 2));
    console.log('Saved to new_state.json. Next step: Merge with Firebase Settings and Upload.');
}

run().catch(console.error);
