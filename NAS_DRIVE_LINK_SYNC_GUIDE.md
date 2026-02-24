# Hướng dẫn tạo & đồng bộ link NAS / Drive cho Haru Job

## Mục tiêu
Tự động điền 3 link trong từng Job:
- `linkNAS` (đường dẫn thư mục NAS)
- `linkDrive` (link thư mục Google Drive)
- `linkCustomer` (link gửi khách, ưu tiên Drive, fallback NAS)

---

## Luồng hoạt động hiện tại

### 1) NAS Scanner (`sync.js`)
Với mỗi job (không ở trash), hệ thống tự tạo path chuẩn:

`{NAS_ROOT}/{YYYY-MM}/{JOB_ID}_{TEN_KHACH}`

Ví dụ:
`/Volumes/HARUwedding/2026-03/16_Ngoc Chau`

- Nếu `linkNAS` chưa có → gán mới
- Nếu đã có nhưng khác chuẩn → cập nhật
- Nếu không đổi → bỏ qua

### 2) Drive Scanner (`sync.js`)
Có 2 chế độ:

#### A. Có danh sách folder Drive thật (`driveFolders`)
- Match theo `job.id` trước
- Không match được thì fallback theo `client/date`
- Gán `linkDrive = https://drive.google.com/drive/folders/{folderId}`

#### B. Chưa có danh sách folder thật
- Tạo link tìm kiếm Drive theo query (fallback):
`https://drive.google.com/drive/search?q={job.id + client}`

### 3) Link khách hàng (`linkCustomer`)
Sau khi có link NAS/Drive, hệ thống tự set:
- Ưu tiên `linkDrive`
- Nếu chưa có Drive thì dùng `linkNAS`

Pseudo:
```js
linkCustomer = linkDrive || linkNAS || ''
```

---

## Cách chạy sync thủ công trong app
1. Vào tab **Sync dữ liệu**
2. Nhập:
   - NAS Root Path (mặc định `/Volumes/HARUwedding`)
   - Drive Folders API (nếu có)
   - Sheet URL (nếu dùng)
3. Bấm **Sync NAS + Drive**
4. Kiểm tra log added/updated/skipped

---

## Quy ước để match chính xác hơn
- Mỗi folder nên chứa `job.id` trong tên
  - Ví dụ: `16_Ngoc Chau`
- Tránh đặt tên folder chỉ có số tiền hoặc text chung chung
- Chuẩn hóa tên khách (không ký tự lạ) để NAS path ổn định

---

## Troubleshooting

### Không thấy nút NAS/Drive trên card job
- Job đó chưa có `linkNAS` và `linkDrive`
- Chạy lại sync
- Refresh cứng trình duyệt

### Link Drive ra trang search, không ra folder cụ thể
- Chưa có nguồn `driveFolders` thật
- Cần cấp API trả folder list hoặc mapping script

### LinkCustomer không đúng
- Rule hiện tại: Drive > NAS
- Kiểm tra 2 field nguồn trước (`linkDrive`, `linkNAS`)

---

## Khuyến nghị nâng cấp tiếp
- Tạo script mapping Drive theo folder ID thật (không dùng search link)
- Bật cron sync mỗi 60 phút
- Bổ sung cảnh báo job thiếu link storage
