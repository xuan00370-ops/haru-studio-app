# Hướng dẫn Cài đặt Google Sheets Sync API cho Haru Studio

Để app Haru Studio có thể tự động lấy dữ liệu dự án từ Google Sheet (bao gồm **nhiều ngày sự kiện, dịch vụ, nhân sự**), bạn cần thiết lập một API trên Google Sheet bằng **Google Apps Script**. Miễn phí, mất khoảng 5 phút.

## Cấu trúc Google Sheet

Bạn cần tạo **2 sheet tabs** trong cùng 1 file Google Sheets:

### Sheet 1: `DỰ_ÁN` (dữ liệu chính)

| Cột A | Cột B | Cột C | Cột D | Cột E | Cột F | Cột G |
|-------|-------|-------|-------|-------|-------|-------|
| MÃ JOB | KHÁCH HÀNG | SĐT | LOẠI HÌNH | GÓI (VNĐ) | CỌC (VNĐ) | TRẠNG THÁI |
| 87-T11 | Nguyễn & Trần | 0901234567 | Wedding | 15000000 | 3000000 | Chưa gửi |
| 88-T11 | Lê & Phạm | 0987654321 | Lễ dạm ngõ | 8000000 | 1600000 | Đang edit |

### Sheet 2: `NGÀY_SỰ_KIỆN` (chi tiết từng ngày)

Mỗi dòng là **1 ngày** của 1 dự án. Nếu dự án có 2 ngày → 2 dòng cùng MÃ JOB.

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| MÃ JOB | NGÀY | NHÃN NGÀY | NHÀ TRAI | NHÀ GÁI | VENUE | GIỜ LỄ | GIỜ TIỆC TRƯA | GIỜ TIỆC TỐI | DỊCH VỤ | THỢ | PHÍ THỢ |
| 87-T11 | 2026-03-15 | Lễ gia tiên | 123 Nguyễn Huệ | 456 Lê Lợi | | 05:00 | | | QUAY PS, CHỤP PS | Anh A, Anh B | 2000000, 1500000 |
| 87-T11 | 2026-03-16 | Tiệc cưới | | | Gem Center | | | 18:00 | QUAY PS, CHỤP PS, QUAY TT | Anh A, Anh B, Anh C | 2000000, 1500000, 2500000 |
| 88-T11 | 2026-03-20 | Lễ dạm ngõ | 789 Trần Hưng Đạo | 321 Hai Bà Trưng | | 06:00 | | | CHỤP PS | Anh D | 1500000 |

> **Mẹo**: Cột DỊCH VỤ, THỢ, PHÍ THỢ phân tách bằng dấu phẩy, tương ứng theo thứ tự.

---

## Các bước thiết lập

### Bước 1: Tạo Google Sheet

1. Tạo Google Sheet mới
2. Đổi tên sheet tab đầu tiên thành `DỰ_ÁN`
3. Tạo sheet tab thứ hai tên `NGÀY_SỰ_KIỆN`
4. Nhập dữ liệu theo cấu trúc ở trên (dòng 1 là header)

### Bước 2: Mở Apps Script

Menu: **Tiện ích mở rộng (Extensions)** > **Apps Script**

### Bước 3: Dán code API

Xóa code cũ (nếu có), dán đoạn code sau:

```javascript
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── Sheet 1: DỰ_ÁN ──
  var jobSheet = ss.getSheetByName('DỰ_ÁN');
  var jobData = jobSheet.getDataRange().getValues();
  var jobs = [];
  for (var i = 1; i < jobData.length; i++) {
    var r = jobData[i];
    if (!r[0]) continue;
    jobs.push({
      id: String(r[0]),       // A: MÃ JOB
      client: r[1] || "",     // B: KHÁCH HÀNG
      phone: String(r[2] || ""),  // C: SĐT
      eventType: r[3] || "Wedding", // D: LOẠI HÌNH
      package: r[4] || 0,     // E: GÓI
      deposit: r[5] || 0,     // F: CỌC
      status: r[6] || "Chưa gửi" // G: TRẠNG THÁI
    });
  }

  // ── Sheet 2: NGÀY_SỰ_KIỆN ──
  var daySheet = ss.getSheetByName('NGÀY_SỰ_KIỆN');
  var eventDays = [];
  if (daySheet) {
    var dayData = daySheet.getDataRange().getValues();
    for (var j = 1; j < dayData.length; j++) {
      var d = dayData[j];
      if (!d[0]) continue;
      eventDays.push({
        jobId: String(d[0]),       // A: MÃ JOB (liên kết)
        date: formatDate(d[1]),    // B: NGÀY
        dayLabel: d[2] || "",      // C: NHÃN NGÀY
        boyHouse: d[3] || "",      // D: NHÀ TRAI
        girlHouse: d[4] || "",     // E: NHÀ GÁI
        venue: d[5] || "",         // F: VENUE
        leSang: d[6] || "",        // G: GIỜ LỄ
        tiecTrua: d[7] || "",      // H: GIỜ TIỆC TRƯA
        tiecToi: d[8] || "",       // I: GIỜ TIỆC TỐI
        services: d[9] || "",      // J: DỊCH VỤ (phẩy phân cách)
        staff: d[10] || "",        // K: THỢ
        costs: String(d[11] || "") // L: PHÍ THỢ
      });
    }
  }

  var result = JSON.stringify({
    status: "success",
    jobs: jobs,
    eventDays: eventDays,
    syncTime: new Date().toISOString()
  });

  return ContentService.createTextOutput(result)
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper: chuyển đổi ngày Google Sheet sang YYYY-MM-DD
function formatDate(val) {
  if (!val) return "";
  if (val instanceof Date) {
    var y = val.getFullYear();
    var m = String(val.getMonth() + 1).padStart(2, '0');
    var d = String(val.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }
  return String(val);
}
```

### Bước 4: Deploy Web App

1. Bấm **Triển khai (Deploy)** > **Triển khai mới (New deployment)**
2. Chọn loại: **Ứng dụng web (Web app)**
3. Cấp quyền: **Bất kỳ ai (Anyone)**
4. Bấm **Triển khai**
5. Cấp quyền lần đầu: chọn tài khoản Google → "Nâng cao" → "Đi tới dự án..." → Cho phép

### Bước 5: Dán link vào Haru Studio

1. **Sao chép** đường link `https://script.google.com/macros/s/.../exec`
2. Mở Haru Studio > Tab **Hệ thống / Sync dữ liệu**
3. Dán link vào ô **Link Google Sheet**
4. Bấm **Sync NAS + Drive**

---

## Sync tự động hàng ngày

Để sync tự động mỗi ngày mà không cần nhấn nút:

### Cách 1: Auto-sync khi mở app (đã tích hợp sẵn)
App Haru sẽ tự động fetch dữ liệu mới nhất từ Sheet mỗi khi bạn mở app (nếu đã nhập link Sheet).

### Cách 2: Google Apps Script Trigger (push notification)
1. Trong Apps Script, vào **Kích hoạt (Triggers)** (icon đồng hồ bên trái)
2. Bấm **+ Thêm kích hoạt mới**
3. Chọn function: `doGet`
4. Chọn nguồn sự kiện: **Theo thời gian (Time-driven)**
5. Chọn kiểu: **Hàng ngày (Day timer)** → chọn **6 giờ sáng - 7 giờ sáng**
6. Bấm **Lưu**

> **Lưu ý**: Trigger chỉ giúp "warm up" API. Khi bạn mở app Haru là data sẽ được tải mới nhất ngay lập tức.

---

## Lưu ý quan trọng

- **Ngày tổ chức** nên dùng format `YYYY-MM-DD` (VD: `2026-03-15`) hoặc dùng kiểu ngày của Google Sheet
- **Dịch vụ, Thợ, Phí thợ** phân tách bằng dấu phẩy, đúng thứ tự tương ứng
- Mỗi dự án nhiều ngày → nhiều dòng trong sheet `NGÀY_SỰ_KIỆN` cùng MÃ JOB
- Nếu sửa data trên Sheet → mở app Haru → bấm Sync → data cập nhật tự động
