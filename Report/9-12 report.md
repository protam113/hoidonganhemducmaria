# Tài liệu API: Quản lý đăng ký sự kiện

## 1. API Lấy Danh Sách Người Tham Gia Sự Kiện

**Endpoint:** `GET {{domain}}/event/:id/register/`

### Mô tả

API này cho phép người dùng lấy danh sách người tham gia sự kiện cụ thể và hỗ trợ lọc danh sách dựa trên trạng thái (**approve**, **pending**, **reject**) và phân trang bằng query parameters.

---

### Phương thức: `GET`

#### URL Mẫu:
```
{{domain}}/event/:id/register/?status={status}&page={page}
```

#### Parameters:

| Tên         | Loại     | Bắt Buộc | Mô tả                                                        |
|-------------|----------|----------|-------------------------------------------------------------|
| `id`        | Path     | Có       | ID của sự kiện.                                             |
| `status`    | Query    | Không    | Trạng thái lọc: `approve`, `pending`, `reject`.             |
| `page`      | Query    | Không    | Số trang cần lấy (mặc định là 1).                           |

#### Ví dụ Request:
```
GET {{domain}}/event/697a784f-c5a1-4c99-88e5-34a4b377ab88/register/?status=approve&page=2
```

---

### Phản hồi:

#### Thành công (`200 OK`):

```json
{
  "current_page": 2,
  "total_pages": 5,
  "total_entries": 50,
  "data": [
    {
      "id": "f1245678-c9ab-1234-de56-789abc123efg",
      "first_name": "Nguyen",
      "last_name": "Van A",
      "email": "nguyenvana@example.com",
      "phone_number": "0123456789",
      "status": "approve",
      "registered_at": "2024-12-01T10:30:00Z"
    },
    {
      "id": "f9876543-ba12-3456-cd78-90ef123abc45",
      "first_name": "Le",
      "last_name": "Thi B",
      "email": "lethib@example.com",
      "phone_number": "0987654321",
      "status": "approve",
      "registered_at": "2024-12-02T14:00:00Z"
    }
  ]
}
```

| Trường           | Loại         | Mô tả                                         |
|-------------------|--------------|----------------------------------------------|
| `current_page`    | Integer      | Trang hiện tại của dữ liệu.                  |
| `total_pages`     | Integer      | Tổng số trang dữ liệu có thể truy cập.       |
| `total_entries`   | Integer      | Tổng số bản ghi.                             |
| `data`            | Array        | Danh sách người tham gia.                    |
| `id`              | String       | ID của bản ghi đăng ký.                      |
| `first_name`      | String       | Họ của người tham gia.                       |
| `last_name`       | String       | Tên của người tham gia.                      |
| `email`           | String       | Email liên hệ của người tham gia.            |
| `phone_number`    | String       | Số điện thoại liên hệ.                       |
| `status`          | String       | Trạng thái đăng ký: `approve`, `pending`, `reject`. |
---

### Lỗi:

#### `400 Bad Request`
```json
{
  "error": "Invalid status parameter. Must be one of 'approve', 'pending', or 'reject'."
}
```

#### `404 Not Found`
```json
{
  "error": "Event not found."
}
```

#### `500 Internal Server Error`
```json
{
  "error": "An unexpected error occurred."
}
```

---

### Cải tiến:

- Hỗ trợ **lọc danh sách** dựa trên trạng thái `status`.
- **Phân trang** bằng cách sử dụng tham số `page`.
- Đảm bảo khả năng mở rộng khi thêm nhiều tiêu chí lọc trong tương lai.
