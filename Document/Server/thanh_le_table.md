

## Mô Tả Hệ Thống Quản Lý Lịch Lễ

Hệ thống quản lý lịch lễ cho phép admin và manager tạo và quản lý các lễ trong suốt cả năm. Mỗi lễ được phân loại theo mức độ quan trọng và loại hình, giúp sắp xếp và hiển thị theo thứ tự ưu tiên trong cùng một ngày.

### 1. Quyền Hạn Người Dùng

- **Admin** và **Manager** có quyền tạo, chỉnh sửa và xóa các lễ trong hệ thống.
- **Admin** có quyền duyệt hoặc phê duyệt những thay đổi quan trọng liên quan đến lịch lễ.

### 2. Phân Loại Lễ

Mỗi lễ sẽ có một trong các phân loại sau đây, giúp sắp xếp lễ theo thứ tự quan trọng khi hiển thị:

- **Lễ Trọng** (Lễ chính yếu, ưu tiên cao nhất)
- **Lễ Cầu Nguyện** (Dành cho các dịp cầu nguyện đặc biệt)
- **Lễ Khấn** (Lễ dành cho các dịp khấn nguyện)
- **Lễ Kỷ Niệm** (Lễ kỷ niệm, như ngày thành lập, ngày lễ bổn mạng)
- Và các loại lễ khác tùy chỉnh theo nhu cầu

> **Lưu ý**: Trong trường hợp một ngày có nhiều lễ, hệ thống sẽ sắp xếp lễ theo mức độ quan trọng đã được định nghĩa.

### 3. Bảng `LeLich` (Lịch Lễ)

| Tên Trường           | Kiểu Dữ Liệu     | Mô Tả                                                            |
|----------------------|------------------|------------------------------------------------------------------|
| `id`                 | `UUID`           | ID duy nhất của lễ                                               |
| `ten_le`             | `string`         | Tên của lễ                                                       |
| `loai_le`            | `enum`           | Loại lễ (`LE_TRONG`, `LE_CAU_NGUYEN`, `LE_KHAN`, ...)             |
| `cha_lam_le`         | `string`         | Tên của cha làm lễ                                               |
| `gio_dien_ra`        | `time`           | Giờ diễn ra thánh lễ                                             |
| `trang_thai`         | `enum`           | Trạng thái của lễ (`ACTIVE`, `CANCELLED`, `PENDING_APPROVAL`)      |
| `ngay_dien_ra`       | `date`           | Ngày diễn ra thánh lễ                                            |
| `giao_xu`            | `string`         | Tên giáo xứ nơi diễn ra thánh lễ                                 |
| `nguoi_tao`          | `UUID`           | ID của người tạo lễ (Admin hoặc Manager)                         |
| `created_at`         | `datetime`       | Ngày tạo sự kiện lễ trong hệ thống                               |
| `updated_at`         | `datetime`       | Ngày cập nhật sự kiện lễ lần cuối                                |

### 4. Quy Trình Tạo và Quản Lý Lễ

1. **Tạo Lễ**: Admin và Manager có thể tạo một sự kiện lễ với các thông tin sau:
   - Tên lễ, loại lễ, cha làm lễ, giờ diễn ra, trạng thái, ngày diễn ra và giáo xứ.
   - Hệ thống sẽ tự động sắp xếp lễ theo thứ tự quan trọng, nếu nhiều lễ trùng ngày.

2. **Phê Duyệt Lễ**: Lễ có thể ở trạng thái `PENDING_APPROVAL` nếu cần phê duyệt bởi Admin.

3. **Hiển Thị và Sắp Xếp**: Hệ thống sẽ tự động sắp xếp các lễ trong một ngày dựa trên loại lễ (ưu tiên `Lễ Trọng` > `Lễ Cầu Nguyện` > `Lễ Khấn`, ...).

### Ví Dụ JSON Dữ Liệu

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "ten_le": "Lễ Khấn Dòng",
  "loai_le": "LE_KHAN",
  "cha_lam_le": "Cha Nguyễn Văn A",
  "gio_dien_ra": "08:00",
  "trang_thai": "ACTIVE",
  "ngay_dien_ra": "2024-12-25",
  "giao_xu": "Giáo xứ Thánh Tâm",
  "nguoi_tao": "admin-uuid",
  "created_at": "2024-11-01T10:00:00Z",
  "updated_at": "2024-11-02T15:00:00Z"
}
```

---

### 5. Lưu Ý và Hướng Dẫn

- **Trạng Thái Lễ**: Các lễ có thể chuyển đổi giữa các trạng thái như đang hoạt động (`ACTIVE`), đã hủy (`CANCELLED`), và chờ phê duyệt (`PENDING_APPROVAL`).
- **Sắp Xếp và Hiển Thị**: Khi truy vấn dữ liệu, các lễ trong cùng một ngày sẽ hiển thị theo thứ tự từ lễ quan trọng nhất đến ít quan trọng hơn.
- **Kiểm Soát Quyền Hạn**: Hệ thống sẽ kiểm tra quyền của người dùng trước khi cho phép tạo hoặc chỉnh sửa lễ.
