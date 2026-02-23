function doGet(e) {
  // Config
  const SHEETS_TO_SYNC = ['THÁNG 1/2026', 'THÁNG 2/2026', 'Tháng 3/2026', 'T4/2026', 'THÁNG 5/2026', 'T6/2026', 'T7/2026'];
  const spreadSheetId = '1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM';
  
  try {
    const ss = SpreadsheetApp.openById(spreadSheetId);
    let allJobs = [];
    let allEventDays = [];

    // Loop through each configured sheet
    for (const sheetName of SHEETS_TO_SYNC) {
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) continue;
      
      const data = sheet.getDataRange().getValues();
      if (data.length <= 1) continue; // Skip if empty or just headers

      let currentJob = null;
      
      // Parse row by row starting from index 1 (skip header)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const jobIdRaw = String(row[0]).trim();
        
        // If row has Job ID (SHĐ-TIME), it's a primary row for a project
        if (jobIdRaw) {
          const clientRaw = String(row[2]).trim();
          if (!clientRaw) continue; // Skip invalid rows without client
          
          currentJob = {
            id: jobIdRaw,
            client: clientRaw,
            date: String(row[1]).trim(),
            phone: extractPhone(String(row[3])),
            eventType: 'Wedding', 
            package: parseCurrency(row[10]),
            deposit: parseCurrency(row[11]),
            status: 'Chưa gửi', // Default status for new imports
            venue: extractVenue(String(row[4])),
            notes: String(row[12] || '').trim(),
            linkNAS: '',
            linkDrive: ''
          };
          
          allJobs.push(currentJob);
          
          // Push the first service for this job
          pushService(allEventDays, currentJob.id, currentJob.date, row);
        } 
        // If row does NOT have Job ID but has Service name, it's a merged sub-row
        else if (currentJob && String(row[5]).trim()) {
          pushService(allEventDays, currentJob.id, currentJob.date, row);
        }
      }
    }

    // Format output exactly as Haru Studio app expects
    const output = {
        jobs: allJobs,
        eventDays: allEventDays
    };

    return ContentService.createTextOutput(JSON.stringify(output))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

// --- HELPER FUNCTIONS ---

function pushService(eventDaysArray, jobId, dateStr, row) {
  const serviceName = String(row[5]).trim();
  if (!serviceName) return;

  const staff = String(row[6]).trim() || 'Chưa xếp';
  const cost = parseCurrency(row[7]);
  const isPaid = String(row[8]).trim().toLowerCase() === 'true';
  const editCost = parseCurrency(row[9]);

  // Find if this job already has an eventDay entry. For simplicity, we bundle all services into day 1
  let eventDay = eventDaysArray.find(d => d.jobId === jobId);
  if (!eventDay) {
    eventDay = {
       jobId: jobId,
       dayLabel: 'Ngày chính',
       date: dateStr,
       services: '',
       staff: '',
       costs: '',
       edits: '',
       paids: ''
    };
    eventDaysArray.push(eventDay);
  }

  // Append comma-separated strings as expected by sync.js 'eventDays' format
  eventDay.services = eventDay.services ? eventDay.services + ',' + serviceName : serviceName;
  eventDay.staff = eventDay.staff ? eventDay.staff + ',' + staff : staff;
  eventDay.costs = eventDay.costs ? eventDay.costs + ',' + cost : String(cost);
  eventDay.edits = eventDay.edits ? eventDay.edits + ',' + editCost : String(editCost);
  eventDay.paids = eventDay.paids ? eventDay.paids + ',' + isPaid : String(isPaid);
}

function parseCurrency(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;
  const numStr = String(val).replace(/[^0-9]/g, '');
  const parsed = parseInt(numStr, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function extractPhone(contactStr) {
  // Tries to extract a standard phone number from a text block
  const match = contactStr.match(/(?:0|\+84)[0-9\s.-]{8,11}/);
  return match ? match[0].replace(/[^0-9]/g, '') : '';
}

function extractVenue(addressStr) {
  // Extremely basic heuristic to extract just the venue name if 'Nhà hàng:' is present
  if(addressStr.includes('Nhà hàng:')) {
     return addressStr.split('Nhà hàng:')[1].trim();
  }
  return addressStr.trim().split('\n')[0]; // fallback to first line
}
