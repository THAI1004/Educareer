# EduCareer - Hệ Thống Tư Vấn Hướng Nghiệp & Ngành Học Đại Học (Holland & DISC)

Ứng dụng web toàn diện tư vấn định hướng ngành nghề và gợi ý ngành đào tạo đại học cho sinh viên theo phân tích hành vi **DISC** và thuyết sở thích nghề nghiệp **Holland (RIASEC)**, kết nối trực tiếp với danh mục ngành đào tạo và mã ngành chuẩn của Bộ Giáo dục & Đào tạo Việt Nam.

---

## 1. TỔNG QUAN LUỒNG NGHIỆP VỤ (WORKFLOW CẬP NHẬT)

Hệ thống được thiết kế theo luồng trải nghiệm tối ưu, đưa người học trực tiếp vào đánh giá bản thân trước khi đối chiếu ngành học:

### 🔹 BƯỚC 1: Thực Hiện Tuần Tự 2 Bài Test Bắt Buộc (Bài 1 Holland Xong Mới Đến Bài 2 DISC)
- **Quy tắc bắt buộc tuần tự (Sequential Mandatory Testing)**:
  - Sinh viên bắt buộc phải làm đủ cả 2 bài test theo thứ tự cố định: **Bài 1 (Holland)** xong thì mới đến **Bài 2 (DISC)**.
  - 1. **Bài Test 1: Trắc Nghiệm Sở Thích Nghề Nghiệp Holland (RIASEC)**: 6 câu hỏi đo lường thiên hướng 6 nhóm (Thực tế R, Nghiên cứu I, Nghệ thuật A, Xã hội S, Quản trị E, Nghiệp vụ C). Bắt đầu làm ngay từ câu 1 đến câu 6.
  - 2. **Bài Test 2: Trắc Nghiệm Phong Cách Hành Vi & Làm Việc DISC**: 6 câu hỏi tình huống thực tế (Quyết đoán D, Ảnh hưởng I, Kiên định S, Tuân thủ C). **Ban đầu bị khóa hoàn toàn**, chỉ mở khóa sau khi sinh viên đã trả lời xong toàn bộ 6 câu của Bài Test 1.
  - Khi hoàn thành câu số 6 của Bài 1, modal hiển thị thông báo chuyển tiếp chúc mừng và nút bấm tự động dẫn vào Bài 2.
- **Tiến độ & Kiểm tra trạng thái**:
  - Mỗi bài test có thanh tiến độ, số câu đã trả lời và trạng thái riêng biệt (Chưa làm / Đang làm dở / Đã hoàn thành / Khóa chờ Bài 1).
  - Nút **"Kiểm Tra Tình Trạng Bài Test"**: Cung cấp phản hồi thông minh theo thời gian thực về tiến độ từng bài và hướng dẫn sinh viên hoàn thành tuần tự.
  - Nút chuyển tiếp chính:
    - Nếu chưa xong Bài 1: Hiển thị *"Làm Bài Test 1: Holland (Câu 1 - 6)"*.
    - Nếu đã xong Bài 1, chưa xong Bài 2: Hiển thị *"Đã Xong Bài 1 → Tiếp Tục Bài Test 2: DISC (Câu 7 - 12)"*.
    - Nếu đã hoàn thành cả 2: Hiển thị *"Xem Lại 2 Bài Test (12 Câu)"*.
  - Hỗ trợ nút **"Điền Mẫu Nhanh"** để trải nghiệm nhanh kết quả đánh giá và mở khóa hệ thống.

### 🔹 BƯỚC 2: Báo Cáo Đánh Giá Toàn Diện (Holland & DISC) & Lựa Chọn Ngành Học Đại Học
- Chỉ được mở khóa sau khi sinh viên đã hoàn thành đủ cả 2 bài test:
  - **Phân tích DISC**: Biểu đồ phân bổ tỷ lệ % cho 4 nhóm (D, I, S, C), xác định nhóm hành vi chủ đạo & nhóm phụ, phân tích điểm mạnh cốt lõi, phong cách làm việc, môi trường lý tưởng và khuyến nghị phát triển.
  - **Phân tích Holland (RIASEC)**: Bảng điểm số 6 nhóm sở thích và mô tả chi tiết nhóm nổi trội.
  - **Lựa chọn & đối chiếu ngành học đại học**: Sinh viên lựa chọn ngành học đại học (từ 22+ ngành chuẩn Bộ GD&ĐT) để hệ thống tự động đối chiếu mức độ tương thích giữa ngành học đó với kết quả bài test vừa hoàn thành.

### 🔹 BƯỚC 3: Gợi Ý Vị Trí Nghề Nghiệp & Ngành Đào Tạo Đại Học Phù Hợp
- Đề xuất danh sách các vị trí việc làm thực tế tương thích nhất dựa trên nhóm Holland và phong cách DISC của sinh viên.
- Cung cấp đầy đủ thông tin:
  - Tên nghề nghiệp gợi ý.
  - Ngành đào tạo đại học tương ứng.
  - Mã ngành chuẩn Bộ GD&ĐT (ví dụ: `7580201`, `7520103`, `7520201`, `7510605`...).
  - Tổ hợp môn xét tuyển tham khảo (A00, A01, D01, D07, B00...).
  - Mức lương trung bình trên thị trường tuyển dụng.
  - Các trường đại học hàng đầu đào tạo ngành này tại Việt Nam.
  - Bộ kỹ năng trọng yếu & các vị trí tuyển dụng thực tế.

---

## 2. QUY TẮC HIỂN THỊ MA TRẬN HƯỚNG NGHIỆP (TAB MA TRẬN)

Theo yêu cầu chuẩn hóa bảo mật và cá nhân hóa:
- **Quy tắc**: Bảng ma trận hướng nghiệp (Tab "Ma Trận") **chỉ được hiển thị sau khi người đó đã làm bài test từ 1 lần trở lên** (tức là đã có kết quả đánh giá hiện tại hoặc trong lịch sử kiểm tra có ít nhất 1 bản ghi).
- **Trạng thái Khóa (Locked State)**: Nếu sinh viên chưa làm bài test lần nào, tab Ma Trận hiển thị giao diện khóa trực quan với thông báo hướng dẫn và nút bấm **"Làm Bài Test Định Hướng Ngay Để Mở Khóa"**.
- **Trạng thái Mở khóa (Unlocked State)**: Cho phép tra cứu, tìm kiếm đa tiêu chí, lọc theo nhóm Holland / DISC, xem modal chi tiết nghề nghiệp và xuất dữ liệu ra file CSV / Excel.

---

## 3. CHỨC NĂNG 2: QUẢN LÝ LỊCH SỬ KHẢO SÁT & IN PHIẾU HƯỚNG NGHIỆP

1. **Lưu trữ lịch sử tự động**:
   - Tự động lưu trữ kết quả mỗi lần làm bài vào `localStorage` (`educareer_history_v2`).
   - Mỗi bản ghi lưu trữ: Mã khảo sát, ngày giờ làm bài, tên sinh viên, nhóm Holland, nhóm DISC, điểm số các nhóm, ngành học lựa chọn đối chiếu.
2. **Xem lại & Phục hồi (Replay)**:
   - Sinh viên hoặc chuyên viên tư vấn có thể xem lại kết quả bất kỳ lần khảo sát nào trong quá khứ.
   - Nhấn "Xem lại" để nạp toàn bộ kết quả lên màn hình chính và tự động mở khóa bảng ma trận.
3. **In ấn / Xuất phiếu hướng nghiệp**:
   - Modal xem trước bản in được định dạng trang A4 tiêu chuẩn (`@media print`), không viền nút bấm thừa, trình bày chuyên nghiệp có chữ ký của sinh viên và chuyên viên tư vấn hướng nghiệp.
4. **Nạp dữ liệu mẫu & Xóa dữ liệu**:
   - Hỗ trợ nút nạp dữ liệu lịch sử mẫu để kiểm thử nhanh các trường hợp điển hình.

---

## 4. QUY CHUẨN THIẾT KẾ & THẨM MỸ GIAO DIỆN

- **Màu sắc chủ đạo**:
  - **Màu da cam nhạt** (`#ffedd5`, `#f97316` / `bg-orange-50 text-orange-800 border-orange-200`) dùng làm điểm nhấn ấm áp, thân thiện cho các nhãn Holland, thông báo và đề mục.
  - **Màu xanh nước biển đơn giản** (`#0284c7`, `#0369a1`, `#f0f9ff` / `bg-sky-600`, `bg-sky-50 text-sky-800 border-sky-300`) dùng cho các nút bấm chính, thanh điều hướng và chỉ số DISC.
  - **Nền thẻ trắng thanh thoát** (`bg-white border-slate-200 shadow-xs rounded-2xl`): Không loang lổ, không dùng dải màu gradient cầu vồng gây rối mắt.
- **Font chữ**:
  - Nhập trực tiếp font **Quicksand** từ Google Fonts (`font-sans: 'Quicksand', sans-serif`), mang lại kiểu chữ bo tròn, hiện đại, rõ ràng, dễ đọc tương tự giao diện mẫu tại *huongnghiepsongan.com*.
- **Loại bỏ các thành phần rườm rà**:
  - Không còn phần chọn ngành học bắt buộc trước bài test.
  - Loại bỏ các dòng chú thích rườm rà gây rối màn hình.
  - Các nút bấm có icon rõ ràng, nhãn ngắn gọn, hỗ trợ đầy đủ trạng thái hover/focus.

---

## 5. BỘ CÂU HỎI TRẮC NGHIỆM ĐỊNH HƯỚNG (12 CÂU HỎI CHUẨN)

### 📌 Phần 1: Bài Test Holland RIASEC (Câu 1 - 6)
- **Câu 1**: Hoạt động trải nghiệm thực tế bạn hứng thú nhất (R: Chế tạo robot/xe cơ khí, I: Thuật toán AI/thí nghiệm, A: Thiết kế 3D/tạo hình, S: Tình nguyện/hỗ trợ, E: Đàm phán/tài chính, C: Quản lý biểu mẫu/tiến độ).
- **Câu 2**: Môi trường làm việc lý tưởng bạn mong muốn gắn bó (R: Hiện trường/xưởng sản xuất, I: Trung tâm R&D/viện khoa học, A: Studio sáng tạo, S: Cơ sở đào tạo/xã hội, E: Doanh nghiệp công nghệ, C: Phòng QA/QC/logistics).
- **Câu 3**: Cách bạn tiếp cận khi sửa chữa hoặc cải tiến vật dụng máy móc (R: Tháo rời dụng cụ tự sửa, I: Tra cứu sơ đồ nguyên lý, A: Tân trang thẩm mỹ kiểu dáng, C: Lập danh mục quy chuẩn).
- **Câu 4**: Môn học hoặc lĩnh vực chuyên môn bạn hứng thú nhất (R: Thực hành xưởng/đồ án thi công, I: Toán ứng dụng/mô phỏng, E: Quản trị dự án/kinh tế, C: Dự toán/tiêu chuẩn ISO).
- **Câu 5**: Loại công cụ và phương tiện bạn thích sử dụng (R: Máy móc gia công/thiết bị đo trắc địa drone, I: Phần mềm mô phỏng Matlab/Python, S: Kênh truyền thông tương tác, C: Bảng tính Excel/ERP).
- **Câu 6**: Giá trị công việc mang lại sự tự hào cho bạn (R: Công trình tòa nhà/máy móc vận hành, I: Phát minh khoa học mới, E: Doanh nghiệp lớn mạnh, C: Hệ thống kiểm soát an toàn tuyệt đối).

### 📌 Phần 2: Bài Test Phong Cách DISC (Câu 7 - 12)
- **Câu 7**: Cách bạn xử lý bài tập lớn và dự án nhóm (D: Nhận vai trò trưởng nhóm quyết đoán, I: Gắn kết truyền cảm hứng sáng tạo, S: Lắng nghe chu đáo giữ hòa khí, C: Lập dàn ý tiêu chuẩn tỉ mỉ).
- **Câu 8**: Phản ứng khi đối mặt với sự cố kỹ thuật bất ngờ (D: Ra quyết định chuyển phương án B ngay, I: Động viên tinh thần pha trò giảm căng thẳng, S: Kiên nhẫn kiểm tra từng bước, C: Mở tài liệu log phân tích nguyên nhân gốc rễ).
- **Câu 9**: Phong cách giao tiếp và kết nối xã hội (D: Hỏi trực tiếp cơ hội thăng tiến, I: Hào hứng networking kết nối rộng rãi, S: Đi cùng bạn thân lắng nghe cẩn trọng, C: Đọc kỹ tài liệu đối chiếu bảng lương).
- **Câu 10**: Cách đưa ra lựa chọn và quyết định quan trọng (D: Chọn phương án thách thức đột phá, I: Chọn nơi văn hóa sôi nổi sáng tạo, S: Chọn nơi ổn định đồng nghiệp gắn bó, C: Lập bảng Excel đánh giá rủi ro định lượng).
- **Câu 11**: Mục tiêu thúc đẩy bạn nỗ lực mỗi ngày (D: Chinh phục mục tiêu khó khẳng định bản thân, I: Nhận lời khen ngợi truyền cảm hứng, S: Giúp đỡ đồng đội giữ hòa thuận, C: Sản phẩm hoàn hảo không tì vết).
- **Câu 12**: Cách tiếp nhận phản hồi và xử lý áp lực (D: Nghe ngắn gọn sửa nhanh, I: Cởi mở trao đổi cầu thị, S: Lặng lẽ lắng nghe từ tốn chỉnh sửa, C: Yêu cầu căn cứ kỹ thuật quy chuẩn).

---

## 6. MA TRẬN 22+ VỊ TRÍ NGHỀ NGHIỆP & NGÀNH ĐÀO TẠO BỘ GD&ĐT

| STT | Nhóm Holland | Nhóm DISC | Nghề Nghiệp Gợi Ý | Ngành Đào Tạo Đại Học | Mã Ngành | Tổ Hợp Môn | Mức Lương TB | Trường Tiêu Biểu |
|---|---|---|---|---|---|---|---|---|
| 1 | R – Kỹ thuật | D – Quyết đoán | Chỉ huy công trường | Kỹ thuật xây dựng | 7580201 | A00, A01, D07 | 18 - 40 triệu | ĐH Xây dựng, ĐHBK TP.HCM |
| 2 | R – Kỹ thuật | D – Quyết đoán | Kỹ sư vận hành sản xuất | Kỹ thuật cơ khí | 7520103 | A00, A01 | 16 - 35 triệu | ĐHBK Hà Nội, ĐHBK TP.HCM |
| 3 | R – Kỹ thuật | D – Quyết đoán | Quản lý thi công điện | Kỹ thuật điện | 7520201 | A00, A01, D07 | 18 - 38 triệu | ĐHBK Hà Nội, ĐH Điện lực |
| 4 | R – Kỹ thuật | D – Quyết đoán | Điều phối vận tải | Logistics & QL Chuỗi cung ứng | 7510605 | A00, A01, D01 | 15 - 32 triệu | ĐH Giao thông Vận tải, ĐH KTQD |
| 5 | R – Kỹ thuật | D – Quyết đoán | Kỹ sư robot công nghiệp | Kỹ thuật điều khiển & Tự động hóa | 7520216 | A00, A01 | 20 - 45 triệu | ĐHBK Hà Nội, ĐH Sư phạm Kỹ thuật |
| 6 | R – Kỹ thuật | I – Ảnh hưởng | Chuyên viên tư vấn thiết bị | Kỹ thuật cơ khí | 7520103 | A00, A01, D01 | 15 - 40 triệu | ĐHBK Hà Nội, ĐH Công nghiệp |
| 7 | R – Kỹ thuật | I – Ảnh hưởng | Kỹ sư hỗ trợ khách hàng | Kỹ thuật ô tô | 7520130 | A00, A01 | 16 - 35 triệu | ĐH Giao thông Vận tải, ĐH SPKT |
| 8 | R – Kỹ thuật | I – Ảnh hưởng | Chuyên viên kinh doanh ô tô | Công nghệ kỹ thuật ô tô | 7510205 | A00, A01, D01 | 18 - 50 triệu | ĐHBK TP.HCM, ĐH GTVT |
| 9 | R – Kỹ thuật | I – Ảnh hưởng | Chuyên viên nông nghiệp CNC | Nông nghiệp công nghệ cao | 7620118 | A00, B00, D07 | 14 - 30 triệu | Học viện Nông nghiệp VN |
| 10 | R – Kỹ thuật | I – Ảnh hưởng | Tư vấn năng lượng tái tạo | Kỹ thuật năng lượng | 7520210 | A00, A01 | 18 - 42 triệu | ĐHBK Hà Nội, ĐH Điện lực |
| 11 | R – Kỹ thuật | S – Kiên định | Kỹ thuật viên bảo trì | Kỹ thuật cơ khí | 7520103 | A00, A01 | 12 - 25 triệu | ĐHBK Hà Nội, ĐH Công nghiệp |
| 12 | R – Kỹ thuật | S – Kiên định | Kỹ thuật viên hệ thống điện | Kỹ thuật điện | 7520201 | A00, A01 | 13 - 26 triệu | ĐH Điện lực, ĐH Giao thông Vận tải |
| 13 | R – Kỹ thuật | S – Kiên định | Chuyên viên vận hành trang trại | Chăn nuôi thú y | 7620105 | B00, A00 | 12 - 24 triệu | Học viện Nông nghiệp, ĐH Nông Lâm |
| 14 | R – Kỹ thuật | S – Kiên định | Kỹ sư thủy sản | Nuôi trồng thủy sản | 7620301 | B00, A00 | 14 - 28 triệu | ĐH Cần Thơ, ĐH Thủy sản |
| 15 | R – Kỹ thuật | S – Kiên định | Kỹ sư thiết bị y tế y sinh | Kỹ thuật y sinh | 7520212 | A00, B00 | 15 - 32 triệu | ĐHBK Hà Nội, ĐHQG TP.HCM |
| 16 | R – Kỹ thuật | C – Tuân thủ | Kỹ sư kiểm định chất lượng QA | Kỹ thuật cơ khí | 7520103 | A00, A01 | 15 - 30 triệu | ĐHBK Hà Nội, ĐHBK TP.HCM |
| 17 | R – Kỹ thuật | C – Tuân thủ | Chuyên viên an toàn lao động | Bảo hộ lao động | 7840118 | A00, A01, B00 | 14 - 28 triệu | ĐH Công đoàn, ĐH Tôn Đức Thắng |
| 18 | R – Kỹ thuật | C – Tuân thủ | Kỹ sư thiết kế máy | Kỹ thuật cơ điện tử | 7520114 | A00, A01 | 16 - 36 triệu | ĐHBK Hà Nội, ĐHBK TP.HCM |
| 19 | R – Kỹ thuật | C – Tuân thủ | Kỹ thuật viên đo đạc | Kỹ thuật trắc địa - Bản đồ | 7520503 | A00, A01 | 13 - 27 triệu | ĐH Mỏ - Địa chất, ĐH Xây dựng |
| 20 | R – Kỹ thuật | C – Tuân thủ | Kỹ sư vật liệu xây dựng | Kỹ thuật vật liệu xây dựng | 7580205 | A00, A01, D07 | 14 - 30 triệu | ĐH Xây dựng, ĐHBK TP.HCM |
| 21 | I – Nghiên cứu | C – Tuân thủ | Kỹ sư phát triển phần mềm nhúng | Kỹ thuật máy tính | 7480106 | A00, A01 | 22 - 50 triệu | ĐHBK Hà Nội, ĐH Công nghệ ĐHQGHN |
| 22 | I – Nghiên cứu | D – Quyết đoán | Nhà khoa học dữ liệu công nghiệp | Kỹ thuật dữ liệu | 7480201 | A00, A01 | 25 - 60 triệu | ĐH Bách Khoa, ĐHQG TP.HCM |

---

## 7. HƯỚNG DẪN KIỂM THỬ & KHỞI CHẠY ỨNG DỤNG

1. **Khởi chạy môi trường phát triển**:
   ```bash
   npm run dev
   ```
   Ứng dụng hoạt động tại: `http://localhost:3000`

2. **Chạy kiểm thử logic tính điểm**:
   ```bash
   node --test src/utils/scoring.test.ts
   ```

3. **Kiểm tra kiểu dữ liệu & cú pháp**:
   ```bash
   npm run lint
   npm run build
   ```

4. **Trải nghiệm nhanh qua URL tham số**:
   - `http://localhost:3000/?demo=1`: Tự động nạp kết quả mẫu của cả 2 bài test và mở khóa toàn bộ báo cáo và ma trận nghề nghiệp.
