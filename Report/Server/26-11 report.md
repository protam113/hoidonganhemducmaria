### Báo cáo lỗi và yêu cầu bổ sung API

#### 1. **Lỗi Xóa Group**
Dưới đây là ví dụ lỗi khi xóa nhóm từ API:

**Request:**
```bash
curl 'http://localhost:8000/group/76f807eb-e52d-4f82-9272-e1d489fea4fb/' \
  -X 'DELETE' \
  -H 'Accept: application/json, text/plain, /' \
  -H 'Accept-Language: vi,en;q=0.9,en-US;q=0.8' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNzY5ODQwLCJpYXQiOjE3MzI1OTcwNDAsImp0aSI6ImRiYTE4NjI1YzNmNTQ4NjhiNGQwYmI3Y2VkMTAyMjg3IiwidXNlcl9pZCI6ImZmNGNmM2ZiLThhYmEtNDAzZC1iYmZjLWNkYTA1ZTg0NTc2YSJ9.zjPkxOXkBIaeZMTStfeaO5LJguKJPsG0sEv8E6AJIzM' \
  -H 'Connection: keep-alive' \
  -H 'Origin: http://localhost:3000' \
  -H 'Referer: http://localhost:3000/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0' \
  -H 'sec-ch-ua: "Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"'
```

#### 2. **API Lấy Chi Tiết Group**
Cần bổ sung một API để lấy chi tiết của group, ví dụ như sau:

**GET Request:**
```bash
curl 'http://localhost:8000/group/{group_id}/' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Content-Type: application/json'
```

#### 3. **Cấu trúc CSDL**

**Tạo Bảng `event_registration`:**
```sql
CREATE TABLE `event_registration` (
  `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  `eventId` INTEGER(),
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255),
  `email` VARCHAR(255),
  `phone_number` CHAR(1),
  PRIMARY KEY(`id`)
);
```

**Tạo Bảng `religious_vocation`:**
```sql
CREATE TABLE `religious_vocation` (
  `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  `create_by` INTEGER() NOT NULL,
  `update_by` INTEGER() NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `desc` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `create_at` DATETIME(),
  `update_at` DATETIME(),
  PRIMARY KEY(`id`)
);
```

**Tạo Bảng `religious_vocation_registration`:**
```sql
CREATE TABLE `religious_vocation_registration` (
  `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  `file` VARCHAR(255),
  `lastname` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `dob` DATETIME() NOT NULL,
  `baptism_day` DATETIME() NOT NULL,
  `baptism_day_for` VARCHAR(255) NOT NULL,
  `baptismal_sponsor` VARCHAR(255) NOT NULL,
  `baptismal_at` VARCHAR(255) NOT NULL,
  `first_communion_day` DATETIME() NOT NULL,
  `confirmation_mass` DATETIME() NOT NULL,
  `confirmation_form` VARCHAR(255) NOT NULL,
  `confirmation_sponsor` VARCHAR(255) NOT NULL,
  `confirmation_at` DATETIME() NOT NULL,
  `dad_first_name` VARCHAR(255) NOT NULL,
  `dad_last_name` VARCHAR(255) NOT NULL,
  `mom_first_name` VARCHAR(255) NOT NULL,
  `mom_last_name` VARCHAR(255) NOT NULL,
  `brothers_and_sisters_name` VARCHAR(255) NOT NULL,
  `brothers_and_sisters_year` DATETIME() NOT NULL,
  `pardoner` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `phone_number` CHAR(1) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `parish_hometown` VARCHAR(255) NOT NULL,
  `learning_process` VARCHAR(255) NOT NULL,
  `religious_vocation_id` INTEGER(),
  PRIMARY KEY(`id`)
);
```

#### 4. **Tạo Lịch (Event Schedule)**

**Tạo Bảng Lịch (Event)**
```sql
CREATE TABLE `event_schedule` (
  `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
  `name` VARCHAR(255) NOT NULL,       -- Tên lễ
  `officiant` VARCHAR(255) NOT NULL,  -- Người trụ trì
  `date` DATETIME NOT NULL,           -- Ngày lễ
  `type` VARCHAR(255) NOT NULL,       -- Trạng thái lễ
  `location` VARCHAR(255) NULL,       -- Địa điểm, có thể null
  PRIMARY KEY(`id`)
);
```

**Ví dụ API Tạo Lịch (Event)**

**POST Request để Tạo Lịch:**
```bash
curl -X POST 'http://localhost:8000/event_schedule/' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}' \
  -d '{
    "name": "Lễ Giáng Sinh",
    "officiant": "Đức Cha Nguyễn Văn An",
    "date": "2024-12-25T00:00:00Z",
    "type": "Lễ trọng",
    "location": "Nhà thờ Chánh Tòa"
  }'
```

#### Yêu Cầu:

- **Lỗi xóa group** cần được kiểm tra để đảm bảo API xóa nhóm hoạt động đúng cách. 
- Cần bổ sung API chi tiết group để dễ dàng lấy thông tin về từng nhóm.
- Cấu trúc các bảng CSDL mới (`event_registration`, `religious_vocation`, `religious_vocation_registration`) cần được kiểm tra kỹ lưỡng để đảm bảo dữ liệu được lưu trữ chính xác.
- Tạo bảng và API cho các sự kiện (lịch lễ) với thông tin chi tiết như tên lễ, người trụ trì, ngày lễ và trạng thái lễ.
