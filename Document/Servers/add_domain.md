
https://portal.vietnix.vn/

### Bước 1: Thêm bản ghi A (Address Record)
1. Nhấp vào dấu **+** (góc phải màn hình) để thêm bản ghi mới.
2. Trong cửa sổ thêm bản ghi:
   - **Name**: Để trống hoặc nhập `@` (đại diện cho tên miền gốc, ví dụ: hoidonganhemducmaria.com).
   - **Type**: Chọn `A`.
   - **Content**: Nhập địa chỉ IP của server của bạn.
   - **TTL**: Để mặc định (1 hour).

3. Nhấn **Save** để lưu bản ghi.

### Bước 2: Thêm bản ghi A cho www (nếu cần)
1. Thêm một bản ghi mới bằng cách nhấn dấu **+**.
2. Cấu hình:
   - **Name**: Nhập `www`.
   - **Type**: Chọn `A`.
   - **Content**: Nhập địa chỉ IP của server.
   - **TTL**: Để mặc định.

3. Nhấn **Save** để lưu.

### Bước 3: Cài Đặt Nginx  rên Server Ubuntu
`
sudo apt update
sudo apt install nginx -y
`
### Bước 4: Cấu hình tên miền trong Web Server
`
sudo nano /etc/nginx/sites-available/hoidonganhemducmaria.com
`

`
server {
    listen 80;
    server_name hoidonganhemducmaria.com www.hoidonganhemducmaria.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`
### Bước 5 : Cài đặt SSL với Certbot

## Cài đặt Certbot:
`
sudo apt install certbot python3-certbot-nginx -y
`
## Cài chứng chỉ SSL cho tên miền:
`
sudo certbot --nginx -d hoidonganhemducmaria.com -d www.hoidonganhemducmaria.com
`

## Tự động gia hạn chứng chỉ:
`
sudo systemctl enable certbot.timer
`


### Final
`
# Cấu hình cho HTTP (port 80)
server {
    listen 80;
    server_name hoidonganhemducmaria.com www.hoidonganhemducmaria.com;

    # Chuyển hướng tất cả yêu cầu HTTP sang HTTPS
    return 301 https://$host$request_uri;
}

# Cấu hình cho HTTPS (port 443)
server {
    listen 443 ssl;
    server_name hoidonganhemducmaria.com www.hoidonganhemducmaria.com;

    # Cấu hình SSL (chứng chỉ SSL được cấp bởi Certbot)
    ssl_certificate /etc/letsencrypt/live/hoidonganhemducmaria.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hoidonganhemducmaria.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Cấu hình Proxy cho Frontend (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;  # Trỏ tới ứng dụng Next.js
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cấu hình Proxy cho Backend (API)
    location /api/ {
        proxy_pass http://103.20.102.30:1337;  # Trỏ tới backend API
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Thêm một server block cho việc không cho phép truy cập HTTP trực tiếp (port 80) mà không chuyển hướng
server {
    listen 80;
    server_name hoidonganhemducmaria.com www.hoidonganhemducmaria.com;

    # Chỉ trả về lỗi 404 nếu có yêu cầu HTTP
    return 404;
}
`
