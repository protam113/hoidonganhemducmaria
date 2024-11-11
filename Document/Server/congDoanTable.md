## Mô tả yêu cầu cho backend

### Mục tiêu:
- Xây dựng hệ thống quản lý danh sách các thầy và cộng đoàn.
- Mỗi cộng đoàn bao gồm 3 đến 6 thành viên với các vai trò cụ thể: **Trưởng Cộng Đoàn**, **Kế Toán**, và **Thành Viên**.
- Admin tạo cộng đoàn trực tiếp, nhưng khi quản trị viên tạo, cần phải chờ xác nhận từ admin.

---

### 1. **Thông Tin Cộng Đoàn**

## Cấu trúc bảng chi tiết

### 1. **Bảng `CongDoan` (Thông Tin Cộng Đoàn)**

| Tên Trường    | Kiểu Dữ Liệu     | Mô Tả                                              |
|---------------|------------------|----------------------------------------------------|
| `id`          | `UUID`           | ID duy nhất của cộng đoàn                          |
| `name`        | `string`         | Tên chính thức của cộng đoàn                       |
| `description` | `text`           | Mô tả chi tiết về cộng đoàn                        |
| `image_url`   | `string (URL)`   | Đường dẫn đến hình ảnh đại diện của cộng đoàn (có thể null nếu không có) |
| `leader_id`   | `UUID`           | ID của trưởng cộng đoàn, liên kết tới bảng `ThanhVien` |
| `member_count`| `integer`        | Tổng số thành viên hiện tại trong cộng đoàn        |
| `created_at`  | `datetime`       | Ngày tạo cộng đoàn                                 |
| `updated_at`  | `datetime`       | Ngày cập nhật thông tin cộng đoàn lần cuối         |

#### Mô tả chi tiết:
- **id**: ID duy nhất cho mỗi cộng đoàn, đảm bảo dễ dàng trong quản lý và liên kết.
- **name**: Tên chính thức của cộng đoàn.
- **description**: Mô tả chi tiết hơn về mục tiêu, vai trò, và các hoạt động chính của cộng đoàn.
- **image_url**: Hình ảnh đại diện của cộng đoàn (tùy chọn).
- **leader_id**: ID của trưởng cộng đoàn, giúp xác định rõ ai là người phụ trách chính của cộng đoàn.
- **member_count**: Tổng số thành viên trong cộng đoàn, tự động cập nhật khi có thành viên mới gia nhập hoặc rời khỏi.
- **created_at**: Thời gian khi cộng đoàn được tạo.
- **updated_at**: Thời gian cập nhật thông tin gần nhất, giúp theo dõi thay đổi trong cộng đoàn.

---

### 2. **Bảng `ThanhVien` (Thông Tin Thành Viên)**

| Tên Trường       | Kiểu Dữ Liệu     | Mô Tả                                              |
|------------------|------------------|----------------------------------------------------|
| `id`            | `UUID`           | ID duy nhất của thành viên                         |
| `name`          | `string`         | Tên của thành viên                                 |
| `email`         | `string`         | Địa chỉ email (liên hệ chính của thành viên)       |
| `phone_number`  | `string`         | Số điện thoại (liên hệ phụ)                         |
| `role`          | `enum`           | Vai trò trong cộng đoàn (`LEADER`, `ACCOUNTANT`, `MEMBER`) |
| `join_date`     | `date`           | Ngày gia nhập cộng đoàn                            |
| `dob`           | `date` hoặc `null`| Ngày sinh của thành viên (có thể null nếu không có)|
| `congdoan_id`   | `UUID`           | ID của cộng đoàn mà thành viên thuộc về            |
| `is_active`     | `boolean`        | Trạng thái hoạt động của thành viên (`true` nếu đang hoạt động) |
| `created_at`    | `datetime`       | Ngày thêm thành viên vào hệ thống                  |
| `updated_at`    | `datetime`       | Ngày cập nhật thông tin thành viên lần cuối        |

#### Mô tả chi tiết:
- **id**: ID duy nhất để xác định mỗi thành viên.
- **name**: Tên của thành viên trong cộng đoàn.
- **email**: Địa chỉ email chính, là phương thức liên hệ chính thức.
- **phone_number**: Số điện thoại của thành viên, là phương thức liên hệ bổ sung.
- **role**: Vai trò trong cộng đoàn. Sử dụng enum để dễ dàng quản lý và lọc theo vai trò (`LEADER`, `ACCOUNTANT`, `MEMBER`).
- **join_date**: Ngày gia nhập cộng đoàn của thành viên.
- **dob**: Ngày sinh của thành viên (có thể để trống nếu thông tin không có).
- **congdoan_id**: ID của cộng đoàn mà thành viên thuộc về, giúp dễ dàng liên kết và quản lý các thành viên theo cộng đoàn.
- **is_active**: Xác định thành viên có đang hoạt động trong cộng đoàn hay không.
- **created_at**: Thời gian khi thành viên được thêm vào hệ thống.
- **updated_at**: Thời gian cập nhật thông tin thành viên gần nhất.

---

### 3. **Quy trình duyệt Cộng Đoàn Mới**

- **Admin** có quyền tạo và phê duyệt cộng đoàn ngay lập tức.
- **Quản trị viên** khi tạo mới cộng đoàn cần sự duyệt của admin để chính thức được thêm vào hệ thống.
- Trạng thái duyệt của cộng đoàn có thể được quản lý thông qua một trường **approval_status** (`PENDING`, `APPROVED`, `REJECTED`) trong bảng `CongDoan`, giúp theo dõi trạng thái duyệt của từng cộng đoàn.

---

### Tóm tắt

- **Cộng Đoàn (`CongDoan`)**: Bao gồm các thông tin cơ bản và thông tin quản lý (tên, mô tả, hình ảnh, trưởng cộng đoàn, số lượng thành viên, ngày tạo và ngày cập nhật).
- **Thành Viên (`ThanhVien`)**: Chứa thông tin chi tiết từng thành viên trong cộng đoàn (tên, liên hệ, vai trò, ngày sinh, trạng thái hoạt động và ngày tạo/cập nhật).
- **Duyệt Cộng Đoàn**: Quy trình xác nhận từ admin khi quản trị viên tạo cộng đoàn mới.

--- 

### Ghi chú:
- Đề xuất thêm **approval_status** trong bảng `CongDoan` giúp quản lý trạng thái duyệt cộng đoàn. 
- Cấu trúc này đảm bảo tính rõ ràng, quản lý dễ dàng, và khả năng mở rộng khi cần thêm các tính năng khác trong tương lai. 

### 3. **Quy Trình Duyệt Cộng Đoàn Mới**

- **Admin**:
  - Có quyền tạo mới và duyệt các cộng đoàn ngay lập tức.
- **Quản trị viên**:
  - Khi tạo mới một cộng đoàn, thông tin sẽ ở trạng thái chờ duyệt và cần xác nhận từ admin trước khi chính thức được thêm vào hệ thống.

---

### Tóm tắt

- **Mỗi Cộng Đoàn** chứa từ 3 đến 6 thành viên với các vai trò: Trưởng Cộng Đoàn, Kế Toán, và Thành Viên.
- **Duyệt Cộng Đoàn**: Khi quản trị viên tạo, cần sự xác nhận của admin.
- Cấu trúc các bảng và trường đã nêu chi tiết ở trên. Hãy xem xét cấu trúc này để đảm bảo tính nhất quán và dễ dàng sử dụng trong hệ thống quản lý.
