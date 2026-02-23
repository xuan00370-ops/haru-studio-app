function doGet(e) {
  // Folder ID: 1A2LyEGwvoj8VNEoZ_kHpy1S9zsvVpWxU
  const FOLDER_ID = '1A2LyEGwvoj8VNEoZ_kHpy1S9zsvVpWxU';
  
  try {
    const rootFolder = DriveApp.getFolderById(FOLDER_ID);
    const folders = [];
    
    // Recursive function to scan sub-folders
    function scanFolder(folder) {
      const subFolders = folder.getFolders();
      while (subFolders.hasNext()) {
        const sub = subFolders.next();
        folders.push({
          id: sub.getId(),
          name: sub.getName()
        });
        scanFolder(sub); // Quét đệ quy nếu có thư mục cấp dưới
      }
    }
    
    scanFolder(rootFolder);
    
    return ContentService.createTextOutput(JSON.stringify({ folders: folders }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
