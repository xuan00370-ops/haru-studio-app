---
description: Quy trình kiểm tra sức khỏe ứng dụng hàng ngày (Lỗi cú pháp, Firebase, Build)
---
Quy trình này giúp bạn kiểm tra nhanh toàn bộ trạng thái của Haru Studio App mỗi ngày hoặc trước khi bắt đầu làm việc.

1. **Kiểm tra cú pháp và Code (Linting)**
   - Quét qua `main.js`, `components.js`, `firebase.js`, `sync.js`, `data.js` để tìm các lỗi cú pháp hoặc biến chưa khai báo (tham chiếu chéo).
   - Kiểm tra xem có cấu hình nào bị thiếu sót hoặc URL nào bị sai lệch định dạng không.

// turbo
2. **Kiểm tra quá trình Build (Vite)**
   - Chạy thử lệnh `npm run build` để đảm bảo hệ thống đóng gói không gặp lỗi ẩn nào không phát hiện được ở chế độ dev.
   - Nếu build thành công, thông báo dung lượng bundle.

3. **Báo cáo tổng quan**
   - Đưa ra danh sách các lỗi (nếu có) và đề xuất phương án sửa chữa.
   - Nếu mọi thứ xanh mượt (✔), thông báo "Hệ thống Haru Studio hoạt động ổn định, sẵn sàng làm việc!".
