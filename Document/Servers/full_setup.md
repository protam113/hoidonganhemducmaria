# Báo Cáo Triển Khai

## 1. Cấu hình Domain
### Đăng ký/Đăng nhập
- Truy cập: [Vietnix Portal](https://portal.vietnix.vn/index.php?rp=/login#tabNameservers)
- Đăng nhập với tài khoản: `marists.champagnatvn@gmail.com`
- mk:MaristsChampagnat2024

### Cấu hình bản ghi DNS
#### Bước 1: Thêm bản ghi A (Address Record)
- Name: `@` hoặc để trống
- Type: `A`
- Content: Địa chỉ IP của server
- TTL: Mặc định (1 hour)

#### Bước 2: Thêm bản ghi A cho `www`
- Name: `www`
- Type: `A`
- Content: Địa chỉ IP của server
- TTL: Mặc định

### Mua Domain và Thanh toán
- Xác nhận mua domain và ký kết hợp đồng

---

## 2. Cấu hình Server
### Đăng ký/Đăng nhập VPS
- Truy cập: [Vietnix Portal](https://portal.vietnix.vn/index.php?rp=/login#tabNameservers)
- Đăng nhập với tài khoản: `marists.champagnatvn@gmail.com`
- MK: MaristsChampagnat2024

### Thiết lập môi trường trên server
#### Cấu hình múi giờ
```bash
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
```
#### Cấu hình Redis
```bash
sudo sysctl vm.overcommit_memory=1
echo "vm.overcommit_memory=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
#### Cài đặt cơ bản
```bash
touch ~/.hushlogin
apt update
apt install sudo
sudo apt update && sudo apt upgrade
```
#### Cài đặt Docker
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
tar -xzvf nhadong.tar.gz
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
sudo systemctl status docker
```
#### Cài đặt Docker Compose
```bash
sudo apt-get install jq
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```
#### Triển khai Backend
```bash
mkdir /opt/backend
scp -r "D:\SERVER\nhadong\nhadongProject\nhadong" root@103.20.102.30:/opt/backend/
scp D:\SERVER\nhadong\nhadongProject\nhadong.tar.gz root@103.20.102.26:/opt/backend/
cd /opt/backend
tar -xzvf nhadong.tar.gz
docker-compose build
docker-compose up -d
```

---

## 3. Cấu hình Frontend
### Cài đặt môi trường Node.js
```bash
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```



### Clone Dự án

#### Vào thư mục
```bash
 cd /var/www
```
#### Clone 2 dự án vào

```bash
git clone https://github.com/protam113/nhadongDashboard.git (dashboard)
git clone https://github.com/protam113/champagnat.git (fe)
```
### Triển khai bằng Docker
```bash
docker-compose build
docker-compose up -d
```

---

## 4. Cấu hình Nginx
### Cài đặt Nginx
```bash
sudo apt update
sudo apt install nginx -y
```
### Cấu hình tên miền
```bash
sudo nano /etc/nginx/sites-available/hoidonganhemducmaria.com
```
#### Cấu hình HTTP Server cho từng dịch vụ
```nginx
server {
    listen 80;
    server_name hoidonganhemducmaria.com www.hoidonganhemducmaria.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
server {
    listen 80;
    server_name api.hoidonganhemducmaria.com;
    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
server {
    listen 80;
    server_name dashboard.hoidonganhemducmaria.com;
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/hoidonganhemducmaria.com /etc/nginx/sites-enabled/
sudo nginx -t 
sudo systemctl reload nginx
```

---

## 5. Cài đặt SSL
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d hoidonganhemducmaria.com -d www.hoidonganhemducmaria.com -d api.hoidonganhemducmaria.com -d dashboard.hoidonganhemducmaria.com
sudo systemctl enable certbot.timer
```

---

## Hoàn thành
Hệ thống đã được triển khai với đầy đủ các dịch vụ: Backend, Frontend, Dashboard, API và bảo mật SSL.
