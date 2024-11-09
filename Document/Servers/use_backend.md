
# Hướng Dẫn Sử Dụng Backend

## Bước 1: Clone Repository
Clone repository từ GitHub về máy của bạn:

```bash
git clone https://github.com/TranThanhHoang123/nhadong.git
```

Thư mục `nhadong` này chứa cả backend và frontend của dự án.

## Bước 2: Mở Dự Án Backend

1. Mở thư mục `nhadongProject` trong `nhadong`:

   ```
   cd nhadong/nhadongProject
   ```

2. Chuột phải vào thư mục `nhadong` trong thư mục `nhadongProject` và chọn **Open Terminal**.

## Bước 3: Build và Khởi Chạy Backend

1. Trong terminal, gõ lệnh sau để build dự án:

   ```bash
   docker-compose build
   ```

2. Sau đó, khởi chạy các dịch vụ:

   ```bash
   docker-compose up
   ```
![image](https://github.com/user-attachments/assets/0059c556-e74e-4a1e-935d-1f91716ca62a)

   Các dịch vụ sẽ được khởi chạy và backend sẽ sẵn sàng hoạt động.

## Bước 4: Kiểm Tra API với Postman

Sau khi backend đã được khởi chạy, bạn có thể kiểm tra API bằng Postman.

1. Mở Postman và gửi yêu cầu `POST` đến địa chỉ:

   ```
   http://localhost:8000/auth/login/
   ```

2. Sử dụng thông tin đăng nhập sau để kiểm tra:

   - **Username**: `admin`
   - **Password**: `123`

Nếu đăng nhập thành công, bạn sẽ nhận được phản hồi từ API.

![image](https://github.com/user-attachments/assets/a483034e-7d20-4920-a30f-a70502c73b10)

