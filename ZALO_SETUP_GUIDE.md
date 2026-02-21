# Hướng dẫn Thiết lập Tích hợp Zalo Nhắc lịch (Zalo Integration)

Ứng dụng Haru Next-Gen cung cấp tính năng **Gửi Lịch Zalo** cho nhân sự trực tiếp từ danh sách nhiệm vụ của Dự án. Để phục vụ tốt nhất, hệ thống cung cấp 2 phương thức:

## Phương thức 1: Copy & Mở Zalo (Nhanh, Cực dễ, Khuyên dùng)
Đây là phương thức đã được **CÀI ĐẶT SẴN (MẶC ĐỊNH)**, không cần setup phức tạp, miễn phí 100%, và dùng được với mọi nhân sự bất chấp họ có Follow OA của bạn hay chưa.

**Cách hoạt động:**
1. Mở chi tiết 1 Dự án -> Chọn nút **Zalo** (Màu xanh) tại 1 dòng nhân sự.
2. Trình duyệt sẽ **Tự động sao chép (Copy)** đoạn tin nhắn nhắc việc theo mẫu rất đẹp.
3. Trình duyệt tự động mở ứng dụng Zalo (Mobile hoặc Web) trỏ thẳng vào cửa sổ chat với Nhân sự đó (dựa trên SĐT đã tạo ở tab Nhân sự).
4. Bạn chỉ cần nhấn Dán (`Ctrl+V` hoặc `Cmd+V`) là xong! Quá trình diễn ra chưa tới 3 giây.

## Phương thức 2: Tự động hoá Zalo OA qua API (Nâng cao)
*Lưu ý: Bạn chỉ nên làm phương thức này nếu Studio của bạn đã xác thực doanh nghiệp thành công chứng minh thư/GPKD với Zalo và bạn có đội ngũ kỹ thuật.*

Thay vì popup Zalo lên, bạn có thể thiết lập App Haru tự động "bắn" API sang Zalo OA để gửi tin nhắn dưới tư cách Brand. Vì Zalo cần có Server Backend để cấu hình Access Token an toàn, ta sẽ dùng **Google Apps Script** làm "Trạm lưu chuyển".

### Bước 1: Lấy Token từ Zalo OA
1. Truy cập [Zalo Developers](https://developers.zalo.me/).
2. Tạo Ứng dụng mới liên kết với Official Account (OA) của Studio.
3. Kích hoạt tính năng **Zalo Notification Service (ZNS)** hoặc cấp quyền Gửi tin nhắn.
4. Lấy `Refresh Token` và `Access Token` của OA.

### Bước 2: Tạo trạm trung chuyển (Google Apps Script)
1. Vào `script.google.com` và tạo Dự án mới.
2. Dán đoạn code gửi Zalo Message API (dùng URLFetchApp).
3. Triển khai code dưới dạng "Web App" và Copy Link Web App.

### Bước 3: Đưa vào App Haru
Trong phiên bản này, Haru đã được set cấu hình sẵn Phương thức 1. Nếu bạn tự cấu hình thành công Zalo API ở Bước 2, bạn có thể vào file `main.js`, tìm hàm `window.sendZaloReminder` và thay đoạn gửi bằng hàm `fetch()` (tương tự như cách ta làm Sync tính năng Google Sheet).

---
**Khuyến nghị:** Phương thức 1 (Copy tự động mở app Zalo) trong phiên bản hiện tại đã cực kì ưu việt, vì không vướng phải policy chống Spam của Zalo ZNS (đòi phí).
