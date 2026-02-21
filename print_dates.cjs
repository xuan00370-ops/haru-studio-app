const { parse } = require('csv-parse/sync');

const GIDS = ['878965634', '2086131536', '1100114477', '275471803', '1726909837'];
const BASE_URL = 'https://docs.google.com/spreadsheets/d/1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM/export?format=csv&gid=';

async function run() {
    for (const gid of GIDS) {
        const res = await fetch(BASE_URL + gid);
        const text = await res.text();
        const records = parse(text, { skip_empty_lines: true, relax_column_count: true });
        records.slice(1).forEach(row => {
            const clientName = (row[2] || '').trim();
            if (clientName && clientName !== '' && clientName !== 'CD - CR') {
                console.log(JSON.stringify(row[1]));
            }
        });
    }
}
run();
