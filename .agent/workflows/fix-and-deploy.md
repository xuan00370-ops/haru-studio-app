---
description: Quy trình fix lỗi, test và deploy tự động cho Haru Studio App
---

// turbo-all

# Fix Lỗi & Deploy Haru Studio

## 1. Kiểm tra lỗi trên localhost

```bash
cd /Users/macbook/Documents/ANTYGRAVYTY/1 && npm run dev
```

Mở `http://localhost:5173/` và kiểm tra các tính năng.

## 2. Chạy browser test tự động

Sử dụng browser subagent để kiểm tra các tính năng chính:

- **Login:** Vào `http://localhost:5173/`, login ADMIN/ADMIN
- **Dashboard:** Kiểm tra tháng mặc định = tháng hiện tại, nút +1T, danh sách job, tổng doanh thu
- **Job Detail:** Click "Xem chi tiết →" trên job card, verify:
  - Nhân sự dropdown hiện danh sách staff
  - Hạng mục: QUAY PS / CHỤP PS / QUAY TT / CHỤP TT
  - Thành phẩm đầu ra tự tạo đúng rule
  - Nút "Lưu thay đổi" hoạt động
  - Nút "Xóa dự án" hoạt động
- **Edit Video:** Cards compact, Editor/Trạng thái/Drive hoạt động
- **Edit Photo:** Tương tự Edit Video
- **Nhân sự:** Thêm/sửa/xóa (admin only)
- **Cài đặt:** "Lưu thông tin" hoạt động, phiên bản + timestamp hiển thị

## 3. Build production

```bash
cd /Users/macbook/Documents/ANTYGRAVYTY/1 && npm run build
```

Kiểm tra build không có lỗi.

## 4. Commit & Push

```bash
cd /Users/macbook/Documents/ANTYGRAVYTY/1 && git add main.js components.js && git commit -m "Mô tả fix" && git push origin main
```

## 5. Verify production

Mở `https://service.haruweddingfilm.com/` (Ctrl+Shift+R) và kiểm tra:
- Version đúng trong Cài đặt
- Tính năng đã fix hoạt động

---

## Checklist Fix Lỗi Nhanh

| Lỗi thường gặp | Nguyên nhân | Fix |
|----------------|-------------|-----|
| Staff dropdown rỗng | `window._state` thay vì `window.state` | Sửa tất cả `_state` → `state` |
| Thành phẩm không hiện | Migration chạy trước bootload | Migration phải nằm trong `bootload()` sau data load |
| Tháng sai | `initMonthYearFromData` ghi đè | Dùng `new Date()` cho currentMonth/Year |
| Nút Lưu không hoạt động | onclick = alert() placeholder | Tạo handler thật (saveXxx) trong main.js |
| UI không cập nhật | Thiếu `updateUI()` sau saveState | Thêm `updateUI()` |
| Chỉ admin mới xóa | Thiếu role check | `if (state.currentUser?.role !== 'admin') return` |

## Quy tắc state

- **LUÔN** dùng `window.state` (KHÔNG dùng `window._state`)
- **LUÔN** gọi `saveState()` sau khi thay đổi state
- **LUÔN** gọi `updateUI()` sau saveState để refresh UI
- **Migration** phải chạy trong `bootload()` SAU khi localStorage/Firebase load xong

## Files chính

| File | Vai trò |
|------|---------|
| `main.js` | Logic, state, handlers, bootload |
| `components.js` | UI rendering (HTML templates) |
| `BUSINESS_RULES.md` | Quy tắc nghiệp vụ |
| `sync.js` | Google Sheet sync |
| `firebase.js` | Firebase realtime database |
