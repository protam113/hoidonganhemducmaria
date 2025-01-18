
## **1. Thiết lập và chạy dự án Front-end**

### **1.1 Clone repository và cài đặt**
```bash
# Clone repository
git clone https://github.com/protam113/champagnat.git

# Chuyển đến nhánh 'final_prob'
git checkout final_prob

# Cài đặt các dependency
npm install
```

### **1.2 Chạy môi trường Development**
```bash
# Chạy dự án ở chế độ development
npm start
```

### **1.3 Build và chạy môi trường Production**
```bash
# Build project cho môi trường production
npm run build

# Cài đặt server static nếu chưa có (dùng serve)
npm install -g serve

# Chạy file build ở local
npm run start
```

---

## **2. Thiết lập và chạy với Docker**

### **2.1 Build Docker image**
```bash
# Build Docker image
docker-compose build
```

### **2.2 Chạy Docker container**
```bash
# Chạy Docker container
docker-compose up -d
```

---

## **3. Tổng quan các bước**
### **Development (Dev)**
1. Clone repository.
2. Cài đặt dependency bằng `npm install`.
3. Chạy server development với `npm start`.

### **Production (Prob)**
1. Build file production bằng `npm run build`.
2. Chạy file build qua server static (ví dụ: `npm run start`).

### **Docker**
1. Build Docker image bằng `docker-compose build`.
2. Chạy container bằng `docker-compose up -d`.



## **1. Thiết lập và chạy dự án Dashboard**

### **1.1 Clone repository và cài đặt**
```bash
# Clone repository
git clone https://github.com/protam113/nhadongDashboard.git

# Di chuyển vào thư mục dự án
cd nhadongDashboard
git checkout dev

# Cài đặt các dependency
npm install
```

---

### **1.2 Chạy môi trường Development**
```bash
# Chạy dự án ở chế độ development
npm start
```

---

### **1.3 Build và chạy môi trường Production**
```bash
# Build project cho môi trường production
npm run build

# Cài đặt server static nếu chưa có (dùng serve)
npm install -g serve

# Chạy file build ở local
serve -s build
```

---

## **2. Thiết lập và chạy với Docker**

### **2.1 Tạo Docker image**
```bash
# Build Docker image
docker-compose build
```

---

### **2.2 Chạy Docker container**
```bash
# Chạy Docker container
docker-compose up -d
```

---

## **3. Tổng quan các bước**

### **Development**
1. **Clone repository**: Tải mã nguồn từ GitHub.
2. **Cài đặt dependency**: Sử dụng `npm install`.
3. **Chạy development server**: Sử dụng `npm start`.

### **Production**
1. **Build production**: Sử dụng `npm run build`.
2. **Chạy file build**: Sử dụng `npm run start`.

### **Docker**
1. **Build Docker image**: Sử dụng `docker-compose build`.
2. **Chạy container**: Sử dụng `docker-compose up -d`.


