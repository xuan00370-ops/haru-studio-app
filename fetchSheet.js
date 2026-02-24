import { google } from 'googleapis';
import fs from 'fs';

const CREDENTIALS_PATH = '/Users/macbook/Documents/ANTYGRAVYTY/b3e4a232-ad38-4898-98bf-b537117247b7';
const SPREADSHEET_ID = '1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM';
const RANGE = "'THÁNG 1/2026'!A1:Z100"; // Quét 100 dòng đầu của Tháng 1/2026

async function testFetchSheet() {
    try {
        console.log('Đang đọc file xác thực...');
        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

        console.log('Đang kết nối tới Google API...');
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        console.log(`Đang lấy dữ liệu từ sheet ID: ${SPREADSHEET_ID}, Range: ${RANGE}...`);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            console.log('Không tìm thấy dữ liệu.');
            return;
        }

        console.log(`Thành công! Lấy được ${rows.length} dòng dữ liệu.`);
        console.log('Header:');
        console.log(rows[0] ? rows[0].join(' | ') : 'Trống');
        console.log('Dòng đầu tiên:');
        console.log(rows[1] ? rows[1].join(' | ') : 'Trống');
        console.log('Dòng thứ 2:');
        console.log(rows[2] ? rows[2].join(' | ') : 'Trống');

    } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ Google Sheets:', error.message);
    }
}

testFetchSheet();
