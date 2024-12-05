![image](https://github.com/user-attachments/assets/2e7a91a1-bf27-43f2-b3fd-10cb70258985)
# Hướng Dẫn update Backend

## Bước 1: Xóa Docker Cũ
![image](https://github.com/user-attachments/assets/745f44c1-6b99-439c-ac91-9fb39e02c72e)



## Bước 2: Xóa Image của nhadongApp

![image](https://github.com/user-attachments/assets/8f6891f3-314f-4df1-821d-f6924a5e8b3a)


## Bước 3: Vào Thư Mục nhadong
1. Trong terminal, gõ lệnh sau để build dự án:

![image](https://github.com/user-attachments/assets/da2b3c4b-b3dc-49ab-9cd4-a10378b290df)

chuột phải vào thư muc nha dòng chọn cmd

2. Nhập
![image](https://github.com/user-attachments/assets/425bb4bf-70e3-4e47-9581-dc3dde613859)

  ```bash
  git pull origin main
   ```


3. Sau đó, build dịch vụ:

   ```bash
   docker-compose build
   ```
  
4.  Sau khi các dịch vụ chạy xong chạy tiếp

   ```bash
   docker-compose up -d
   ```

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

