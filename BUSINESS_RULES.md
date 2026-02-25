# 📋 QUY TẮC NGHIỆP VỤ — HARU STUDIO

> Tài liệu tham khảo cho mọi lập trình viên/AI khi phát triển ứng dụng Haru Job.
> Cập nhật lần cuối: 24/02/2026 — v3.1.0-Premium

---

## 1. THÀNH PHẨM ĐẦU RA (Deliverables)

Thành phẩm được **tự động tạo** dựa trên nhân sự đi làm (services) của dự án:

### Video
| Số máy quay | Thành phẩm |
|-------------|------------|
| 1 máy quay phóng sự | 1 × **Clip Phóng sự** |
| 2+ máy quay | 1 × **Clip Phóng sự** + 1 × **Clip Truyền thống** |

### Photo
| Số máy chụp | Thành phẩm |
|-------------|------------|
| 1 máy chụp | 1 × **Bộ Hình** |
| 2 máy chụp | 2 × **Bộ Hình** (Bộ Hình 1, Bộ Hình 2) |
| N máy chụp | N × **Bộ Hình** |

> **Lưu ý:** Thành phẩm chỉ tự tạo khi job chưa có deliverables. Job đã có sẽ không bị ghi đè.

---

## 2. NHÂN SỰ ĐI LÀM (Services)

- Mỗi ngày làm việc có danh sách nhân sự riêng
- Dropdown nhân sự phải lấy từ **state.staff** (tab Nhân sự)
- Vai trò: `Quay phim`, `Chụp ảnh`, `Cinema`, `Quay Flycam`, `Editor`, `Hỗ trợ`, `Quản lý`, `Khác`
- Mỗi nhân sự có: **Chi phí thợ** (cost) + **Chi phí edit** (edit)

---

## 3. HẠNG MỤC QUAY/CHỤP

Các hạng mục chuẩn:
- **QUAY PS** — Quay phóng sự
- **CHỤP PS** — Chụp phóng sự
- **QUAY TT** — Quay truyền thống
- **CHỤP TT** — Chụp truyền thống

---

## 4. DEADLINE & TIẾN ĐỘ

### Edit Video/Photo
- **Deadline mặc định:** 20 ngày kể từ ngày sự kiện
- Trạng thái: `Chưa bắt đầu` → `Đang chỉnh sửa` → `Demo` → `Chỉnh sửa lại` → `Hoàn thành`

### Mức độ khẩn cấp (Calendar)
| Thời gian còn lại | Mức độ | Màu |
|-------------------|--------|-----|
| ≤ 0 ngày | 🔴 KHẨN CẤP | Đỏ |
| 1–3 ngày | 🟠 SẮP TỚI | Cam |
| 4–7 ngày | 🟢 ỔN ĐỊNH | Xanh lá |
| > 7 ngày | ⚪ BÌNH THƯỜNG | Xám |

---

## 5. TÀI CHÍNH

### Công thức tính
```
Doanh thu       = Giá trị gói (package)
Chi phí thợ     = Tổng cost trong services
Chi phí edit    = Tổng edit trong services
Chi phí Ads     = financeMetadata[month].ads
Chi phí Office  = financeMetadata[month].office
─────────────────────────────────
Tổng chi phí    = Chi phí thợ + edit + Ads + Office
Thuế (10%)      = Doanh thu × 0.1
Lợi nhuận ròng  = Doanh thu - Tổng chi phí - Thuế
```

### Thanh toán
- **Cọc mặc định:** 20% giá trị gói
- Trạng thái: `Đã đặt cọc` | `Đã tất toán`
- Còn lại = Giá gói − Cọc

---

## 6. LỌC DỮ LIỆU

### Dashboard (Trang chủ)
- **Mặc định:** Tháng hiện tại
- **Gộp tháng:** Nút `+1T` cho phép gộp 2 tháng liên tiếp (VD: T2+T3)
- Bộ lọc: Nhân sự, Trạng thái, Tìm kiếm

### Edit Video / Edit Photo
- Lọc theo Editor (nhân sự hậu kỳ)
- Lọc theo trạng thái: Tất cả | Chưa xong | Chưa gửi Demo | Hoàn thành
- **Thiếu Link:** Lọc clip đã hoàn thành nhưng chưa có link NAS/Drive
- Chế độ xem: Kanban | List

---

## 7. QUYỀN TRUY CẬP

| Role | Có thể xem | Không thể xem |
|------|-----------|---------------|
| `admin` | Tất cả | — |
| `editor` | Edit Video/Photo, Kanban, Calendar | Tài chính, Chi phí thợ |
| `staff` | Lịch cá nhân, Job được gán | Quản lý, Tài chính |

---

## 8. TÍNH NĂNG UX (Phase 3)

| # | Tính năng | Mô tả |
|---|-----------|-------|
| 3 | Editor KPI | Panel tím hiện clip hoàn thành/editor (admin only) |
| 4 | Calendar Smart Focus | Auto-scroll đến ngày hôm nay |
| 5 | Multi-select | Checkbox trên Kanban cards + bulk "Đánh dấu Hoàn thành" |
| 6 | Audit Link Filter | Nút 🔗 Thiếu Link trong EditVideo/Photo |
| 7 | Cmd+K Enhanced | Gõ `> lệnh` để điều hướng nhanh |
| 8 | Notification Bell | 🔔 Lịch sử hoạt động (max 50 entries) |
| 9 | Progress Bar | Thanh % deliverables trong Quick Preview |
| 10 | Floating Save | Pill trạng thái lưu (saving/saved/error) |

---

## 9. TECHNICAL NOTES

- **State global:** `window.state` (KHÔNG dùng `window._state`)
- **Firebase:** Realtime Database, config lưu trong localStorage
- **Autosave:** `showFloatingSaveStatus()` thay cho toast cũ
- **Notification:** `addHistory()` tự push vào `state.notificationLog`
- **Multi-month:** `state.extraMonth = { month, year }` — `null` = chỉ 1 tháng

---

## 10. PHÂN PHỐI & DEPLOYMENT (QUAN TRỌNG)

- **Nguyên tắc triển khai:** Mọi cập nhật mã nguồn dự án bắt buộc **phải đi qua luồng GitHub** (commit & push lên nhánh chính của repository).
- Không deploy trực tiếp thông qua các công cụ bên thứ 3 khác (ví dụ: không gõ `npx vercel` hay `firebase deploy` trực tiếp từ máy nhánh) để đảm bảo đồng bộ luồng CI/CD.
- **Web Server Chính Thức:** `https://service.haruweddingfilm.com/`
