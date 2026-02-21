# Hướng dẫn Thiết lập Firebase Database cho Haru Studio

Để ứng dụng Haru Studio có thể kết nối Internet, lưu trữ dữ liệu an toàn trên đám mây, gửi thông báo Zalo và cho phép Khách hàng tra cứu tiến độ bằng điện thoại, hệ thống bắt buộc phải có một Database Online. **Firebase Realtime Database** của Google là lựa chọn tốt nhất, hoàn toàn miễn phí và siêu tốc độ.

Dưới đây là các bước để Khởi tạo Database và kết nối với app Haru Studio (Mất khoảng 3 phút).

## Bước 1: Tạo dự án Firebase
1. Truy cập trang web: [Firebase Console](https://console.firebase.google.com/) và đăng nhập bằng tài khoản Google của bạn (Ví dụ: tên studio hoặc cá nhân).
2. Nhấn vào nút **"Creae a project"** (Thêm dự án).
3. Đặt tên dự án (VD: `Haru-Studio-Manager`) -> Bấm Tiếp tục.
4. Ở màn hình Google Analytics, bạn có thể **Tắt (Disable)** đi cho nhẹ rắc rối -> Bấm **Create project**.
5. Đợi 10 giây cho Firebase khởi tạo xong -> Bấm **Continue**.

## Bước 2: Tạo Realtime Database
1. Trong bảng điều khiển bên trái, tìm mục **Build** (Xây dựng) -> Nhấn vào **Realtime Database**.
2. Nhấn nút **Create Database**.
3. Chọn vị trí máy chủ (có thể chọn `Singapore` hoặc `us-central1` đều được) -> Bấm **Next**.
4. Chọn **Start in TEST MODE** (Rất quan trọng để app có thể đọc/ghi dữ liệu ngay lập tức mà không cần xác thực phức tạp lúc đầu) -> Bấm **Enable**.

## Bước 3: Lấy bộ mã Config chuẩn bị cho App
1. Về lại màn hình chính của Firebase (Bấm vào logo Firebase ở góc trên cùng bên trái hoặc nút `Project Overview`).
2. Sẽ có dòng chữ "Get started by adding Firebase to your app". Bấm vào **biểu tượng dấu khoanh nhọn `</>` (Web)**.
3. Đặt biệt danh (VD: `Haru Web App`) -> Khỏi tick mục Hosting -> Bấm **Register app**.
4. Màn hình tiếp theo sẽ hiện ra một đoạn code. Hãy chú ý biến số tên `const firebaseConfig = { ... };`. Sao chép nguyên phần nội dung cấu hình nằm giữa `{ ... }` (Bao gồm cả dấu ngoặc dẹp).
Nó sẽ trông như thế này:
```json
{
  "apiKey": "AIzaSyBxxxxxxx",
  "authDomain": "haru-studio-manager.firebaseapp.com",
  "databaseURL": "https://haru-studio-manager-default-rtdb.firebaseio.com",
  "projectId": "haru-studio-manager",
  "storageBucket": "haru-studio-manager.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abcdef"
}
```

## Bước 4: Nhập Config vào Haru Studio
1. Mở app Haru Studio của bạn trên trình duyệt (localhost).
2. Tới tab **Hệ Thống -> Cài đặt**. (Lưu ý: Tính năng này đang được code, lát nữa bạn sẽ dán config này vào ô Cài đặt Firebase trên bảng Cài đặt).
3. Dán đoạn JSON config bạn vừa sao chép ở trên vào ô **Firebase Config JSON**.
4. Nhấn **Lưu** và Tải lại trang (F5).

Hệ thống sẽ chuyển từ bộ nhớ tạm sang lưu trữ Đám Mây Realtime. App Haru Next-Gen của bạn đã chính thức được nối mạng! 🎉
