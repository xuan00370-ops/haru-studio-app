import { google } from 'googleapis';
import fs from 'fs';

const CREDENTIALS_PATH = '/Users/macbook/Documents/ANTYGRAVYTY/b3e4a232-ad38-4898-98bf-b537117247b7';
const SPREADSHEET_ID = '1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM';

async function getSheetNames() {
    try {
        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });
        const sheetNames = response.data.sheets.map(s => s.properties.title);
        console.log('Các Tab trong file này gồm:', sheetNames);
    } catch (e) {
        console.error('Lỗi API:', e.message);
    }
}
getSheetNames();
