# Hướng dẫn Cài đặt Google Sheets Sync API cho Haru Studio

Để app Haru Studio có thể tự động lấy dữ liệu dự án từ link Google Sheet của bạn (Sync), bạn cần thiết lập một API nhỏ trên file Google Sheet đó bằng **Google Apps Script**. Quá trình này hoàn toàn miễn phí và cực kỳ đơn giản (mất 2 phút).

## Các bước thực hiện:

### Bước 1: Mở Google Sheet của bạn
Mở file Google Sheet chứa dữ liệu dự án Haru mà bạn đang quản lý.

*(Lưu ý: Sheet nên có các cột cơ bản như Mã Job (ID), Tên Khách (Client), Ngày, Gói chụp, Cọc, v.v.)*

### Bước 2: Mở Apps Script
Trên thanh menu của Google Sheet, chọn:
**Tiện ích mở rộng (Extensions)** > **Apps Script**

### Bước 3: Dán đoạn code sau đây
Xóa toàn bộ code cũ (nếu có) trong màn hình Apps Script vừa mở ra, và sao chép/dán đoạn code dưới đây vào:

```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Giả sử dòng 1 là Header. Lấy dữ liệu từ dòng 2 trở đi.
  var data = sheet.getDataRange().getValues();
  
  var headers = data[0]; 
  var jobs = [];
  
  for(var i = 1; i < data.length; i++) {
    var row = data[i];
    // Map các cột trong Sheet của bạn vào object.
    // BẠN CẦN THAY ĐỔI index (0, 1, 2...) tương ứng với cột trong Sheet của mình.
    // Ví dụ trong mảng row: [A, B, C, D, E] tương ứng index [0, 1, 2, 3, 4]
    
    var jobId = row[0]; // Giả sử Cột A là chứa Mã Job (CD-CR)
    if (!jobId) continue;
    
    var job = {
      id: String(jobId),
      client: row[1] || "", // Giả sử Cột B là Tên Khách
      date: row[2] || "",   // Giả sử Cột C là Ngày chụp
      package: row[3] || 0, // Giả sử Cột D là Gói chụp
      deposit: row[4] || 0, // Giả sử Cột E là Số tiền cọc
      status: "Chưa gửi"
    };
    
    jobs.push(job);
  }
  
  var result = JSON.stringify({
    status: "success",
    jobs: jobs
  });
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
```

> **Lưu ý quan trọng**: Bạn cần chỉnh sửa lại số `row[0]`, `row[1]`... ở đoạn code trên cho khớp ứng với vị trí các cột trong Sheet của bạn (A=0, B=1, C=2...).

### Bước 4: Triển khai (Deploy) làm API Web App
1. Ở góc trên cùng bên phải màn hình Apps Script, bấm nút **Triển khai (Deploy)** > **Triển khai mới (New deployment)**.
2. Bấm vào biểu tượng răn cưa (⚙️) kế bên "Chọn loại (Select type)" và chọn **Ứng dụng web (Web app)**.
3. Trong ô "Cấp quyền truy cập (Who has access)", hãy chọn **Bất kỳ ai (Anyone)**.
4. Bấm chữ **Triển khai**.
5. Google sẽ yêu cầu Cấp Quyền Truy Cập (Authorize Access) lần đầu. Bạn chọn tài khoản Google của mình, chọn "Nâng cao (Advanced)" -> "Đi tới dự án (Go to project... unsafe)" -> Cho phép.

### Bước 5: Lấy Link Web App dán vào App Haru
Sau khi Deploy xong, Google sẽ cung cấp cho bạn một đường link bắt đầu bằng `https://script.google.com/macros/s/.../exec`.
1. **Sao chép** đường link này.
2. Mở app Haru Studio > Tab **Hệ thống / Sync dữ liệu**.
3. Dán link vừa copy vào ô **Link Google Sheet**.
4. Bấm nút **Sync NAS + Drive**.

Hệ thống sẽ ngay lập tức fetch dữ liệu mới nhất từ file Sheet của bạn, các dự án mới sẽ tự động được thêm vào Dashboard cực kỳ chính xác!
