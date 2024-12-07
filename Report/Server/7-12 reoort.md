
# Tài liệu API cho hệ thống Sứ Bụ

## Tổng Quan

Hệ thống này cung cấp các API cho việc quản lý tài liệu (gọi là "Sứ Bụ") với các thao tác **POST**, **GET**, **PATCH**, và **DELETE**. Ngoài ra, hệ thống còn cung cấp các API để **khôi phục mật khẩu** và **thay đổi mật khẩu** cho người dùng.

## 1. Sứ Bụ - Các Thao Tác CRUD

Các API này giúp quản lý các tài liệu "Sứ Bụ", và các tài liệu này có thể được truy cập công khai.

### 1.1 POST - Tạo Mới Sứ Bụ

**Endpoint:** `POST /api/su-bu`

**Dữ liệu yêu cầu (Request Body):**
```json
{
    "title": "Tiêu đề tài liệu",
    "description": "Mô tả ngắn gọn của tài liệu",
    "content": "Nội dung của tài liệu",
    "link": "https://example.com/tailieu",
    "image": "https://example.com/image.png",
    "categories": [
        {
            "id": 1,
            "name": "Danh mục 1",
            "file": "https://example.com/category1.png"
        }
    ]
}
```

**Phản hồi (Response):**
- `201 Created`
- Trả về tài liệu vừa tạo.

```json
{
    "id": 1,
    "title": "Tiêu đề tài liệu",
    "description": "Mô tả ngắn gọn của tài liệu",
    "content": "Nội dung của tài liệu",
    "link": "https://example.com/tailieu",
    "image": "https://example.com/image.png",
    "categories": [
        {
            "id": 1,
            "name": "Danh mục 1",
            "file": "https://example.com/category1.png"
        }
    ],
    "user": {
        "id": 1,
        "username": "username",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "phone_number": null,
        "profile_image": "https://example.com/profile.jpg"
    }
}
```

### 1.2 GET - Lấy Danh Sách Sứ Bụ

**Endpoint:** `GET /api/su-bu`

**Phản hồi (Response):**
- `200 OK`
- Trả về danh sách tất cả các tài liệu "Sứ Bụ".

```json
[
    {
        "id": 1,
        "title": "Tiêu đề tài liệu",
        "description": "Mô tả ngắn gọn của tài liệu",
        "content": "Nội dung của tài liệu",
        "link": "https://example.com/tailieu",
        "image": "https://example.com/image.png",
        "categories": [
            {
                "id": 1,
                "name": "Danh mục 1",
                "file": "https://example.com/category1.png"
            }
        ],
        "user": {
            "id": 1,
            "username": "username",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.com",
            "phone_number": null,
            "profile_image": "https://example.com/profile.jpg"
        }
    }
]
```

### 1.3 PATCH - Cập Nhật Sứ Bụ

**Endpoint:** `PATCH /api/su-bu/{id}`

**Dữ liệu yêu cầu (Request Body):**
```json
{
    "title": "Tiêu đề cập nhật",
    "description": "Mô tả cập nhật của tài liệu",
    "content": "Nội dung cập nhật của tài liệu",
    "link": "https://example.com/tailieu-cập-nhat",
    "image": "https://example.com/image-cập-nhat.png"
}
```

**Phản hồi (Response):**
- `200 OK`
- Trả về tài liệu đã được cập nhật.

```json
{
    "id": 1,
    "title": "Tiêu đề cập nhật",
    "description": "Mô tả cập nhật của tài liệu",
    "content": "Nội dung cập nhật của tài liệu",
    "link": "https://example.com/tailieu-cập-nhat",
    "image": "https://example.com/image-cập-nhat.png",
    "categories": [
        {
            "id": 1,
            "name": "Danh mục 1",
            "file": "https://example.com/category1.png"
        }
    ],
    "user": {
        "id": 1,
        "username": "username",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "phone_number": null,
        "profile_image": "https://example.com/profile.jpg"
    }
}
```

### 1.4 DELETE - Xóa Sứ Bụ

**Endpoint:** `DELETE /api/su-bu/{id}`

**Phản hồi (Response):**
- `200 OK`
- Xác nhận tài liệu đã bị xóa.

```json
{
    "message": "Sứ Bụ đã được xóa thành công"
}
```

## 2. Quản Lý Mật Khẩu

### 2.1 Quên Mật Khẩu

**Endpoint:** `POST /api/auth/forgot-password`

**Dữ liệu yêu cầu (Request Body):**
```json
{
    "email": "user@example.com"
}
```

**Phản hồi (Response):**
- `200 OK`
- Gửi mã khôi phục mật khẩu đến email của người dùng.

```json
{
    "message": "Mã khôi phục đã được gửi tới email của bạn."
}
```

### 2.2 Đặt Lại Mật Khẩu

**Endpoint:** `POST /api/auth/reset-password`

**Dữ liệu yêu cầu (Request Body):**
```json
{
    "email": "user@example.com",
    "code": "123456",
    "new_password": "mật khẩu mới"
}
```

**Phản hồi (Response):**
- `200 OK`
- Mật khẩu đã được đặt lại thành công.

```json
{
    "message": "Mật khẩu của bạn đã được đặt lại thành công."
}
```

### 2.3 Thay Đổi Mật Khẩu

**Endpoint:** `POST /api/auth/change-password`

**Dữ liệu yêu cầu (Request Body):**
```json
{
    "old_password": "mật khẩu cũ",
    "new_password": "mật khẩu mới"
}
```

**Phản hồi (Response):**
- `200 OK`
- Mật khẩu đã được thay đổi thành công.

```json
{
    "message": "Mật khẩu của bạn đã được thay đổi thành công."
}
```

## 3. Xử Lý Lỗi

Hệ thống API sẽ xử lý lỗi với các mã lỗi tương ứng. Dưới đây là ví dụ về các phản hồi lỗi:

### 3.1 Ví Dụ Phản Hồi Lỗi

**Phản hồi lỗi:**
- `400 Bad Request` (cho các dữ liệu không hợp lệ)
- `401 Unauthorized` (cho các vấn đề xác thực)

```json
{
    "error": "Dữ liệu không hợp lệ"
}
```

### 3.2 Phản Hồi Lỗi Xác Thực

**Phản hồi lỗi:**
- `401 Unauthorized`

```json
{
    "error": "Cần xác thực để thực hiện thao tác này"
}
```


### Lý thuyết:
1. **Quản lý tài liệu "Sứ Bụ"**: Các thao tác CRUD (Tạo, Lấy, Cập nhật, Xóa) cho tài liệu giúp người dùng có thể thêm mới tài liệu, sửa đổi thông tin tài liệu, lấy danh sách tài liệu và xóa tài liệu không còn cần thiết.
2. **Quản lý mật khẩu**:
    - **Quên mật khẩu**: Người dùng sẽ nhập email để nhận mã xác nhận. Sau đó, họ sẽ nhập mã và mật khẩu mới để khôi phục tài khoản.
    - **Thay đổi mật khẩu**: Người dùng đăng nhập và nhập mật khẩu cũ, rồi thay đổi mật khẩu mới. Hệ thống sẽ kiểm tra mật khẩu cũ và cập nhật mật khẩu mới nếu hợp lệ.
3. **Xử lý lỗi**: Các mã lỗi như `400` (Dữ liệu không hợp lệ), `401` (Cần xác thực) giúp người dùng hiểu được lý do tại sao yêu cầu của họ không được thực hiện.

Hy vọng tài liệu này đáp ứng yêu cầu của bạn về hệ thống API và các tính năng liên quan đến mật khẩu!
