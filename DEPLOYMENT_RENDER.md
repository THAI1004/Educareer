# Hướng Dẫn Triển Khai Dự Án EduCareer Lên Render (Full Stack & PostgreSQL)

Hệ thống được thiết kế theo kiến trúc **Full-stack Node.js + React Vite + PostgreSQL**, sẵn sàng chạy chỉ với 1 Web Service trên Render (phục vụ cả API Backend và giao diện Frontend).

---

## 1. Thông Tin Kết Nối Cơ Sở Dữ Liệu (PostgreSQL Cloud)
Cơ sở dữ liệu đang hoạt động trực tuyến trên Render:
* **Host**: `dpg-db8uloc9v7es73duo1kg-a.oregon-postgres.render.com`
* **Database**: `educareer_db`
* **User**: `educareer_db_user`
* **Password**: `Enrzxfvag8mR8VExXOESAz9zdUyF8QyY`
* **Port**: `5432`
* **Chuỗi kết nối (DATABASE_URL)**:
  ```
  postgresql://educareer_db_user:Enrzxfvag8mR8VExXOESAz9zdUyF8QyY@dpg-db8uloc9v7es73duo1kg-a.oregon-postgres.render.com/educareer_db
  ```
*(Cơ sở dữ liệu này đã được khởi tạo sẵn sàng toàn bộ bảng, dữ liệu mẫu ngành nghề, Holland, DISC, ngân hàng 280 câu hỏi và tài khoản admin).*

---

## 2. Các Bước Đẩy Code Lên GitHub

Mở Terminal tại thư mục dự án và chạy các lệnh:

```bash
# 1. Tạo repository mới trên GitHub của bạn (ví dụ: career-path-finder)
# 2. Liên kết remote GitHub:
git remote add origin https://github.com/<tai-khoan-github-cua-ban>/career-path-finder.git
git branch -M main
git push -u origin main
```

---

## 3. Thiết Lập Triển Khai Trên Render (Web Service)

1. Truy cập [dashboard.render.com](https://dashboard.render.com).
2. Nhấn nút **New +** -> Chọn **Web Service**.
3. Chọn kho mã nguồn GitHub vừa đẩy lên (`career-path-finder`).
4. Điền các cấu hình cơ bản:
   * **Name**: `educareer-platform` (hoặc tên tùy thích)
   * **Language**: `Node`
   * **Branch**: `main`
   * **Build Command**:
     ```bash
     npm install --legacy-peer-deps && npm run build
     ```
   * **Start Command**:
     ```bash
     npm start
     ```
   * **Instance Type**: `Free`

5. Thêm các **Environment Variables (Biến môi trường)**:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | `postgresql://educareer_db_user:Enrzxfvag8mR8VExXOESAz9zdUyF8QyY@dpg-db8uloc9v7es73duo1kg-a.oregon-postgres.render.com/educareer_db` |
   | `VITE_GOOGLE_CLIENT_ID` | `702758968217-l13pp11dut6n3scm7tn7tfq82pue0ll9.apps.googleusercontent.com` |
   | `GOOGLE_CLIENT_ID` | `702758968217-l13pp11dut6n3scm7tn7tfq82pue0ll9.apps.googleusercontent.com` |

6. Nhấn **Create Web Service**. Render sẽ tự động cài đặt thư viện, build giao diện Vite vào thư mục `dist`, và khởi chạy server trên cổng của Render.

---

## 4. Tài Khoản Quản Trị Viên (Admin) Gửi Cho Khách Hàng

* **Email Admin**: `thaiphph52804@gmail.com`
* Khi khách hàng đăng nhập tài khoản Gmail này (hoặc đăng nhập qua popup), hệ thống sẽ tự động nhận diện quyền **Quản Trị Viên (Admin)** để truy cập đầy đủ các chức năng:
  * Quản trị người dùng & học sinh.
  * Giám sát tiến trình làm bài thi trực tiếp thời gian thực.
  * Xem & in phiếu báo cáo lịch sử thi hàng loạt.
  * Ngân hàng câu hỏi trắc nghiệm (Thêm/Sửa/Xóa, Tải mẫu Excel, **Import file Excel**).
  * Quản lý nhóm Holland, nhóm DISC, Ngành đào tạo đại học và Ma trận chéo.
