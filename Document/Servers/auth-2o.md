### **Hướng dẫn chi tiết triển khai Google Authenticator làm xác minh 2 bước cho SSH**

Google Authenticator cung cấp một cách đơn giản và an toàn để bật xác minh 2 bước (2FA) cho SSH. Đây là quy trình từng bước:

---

### **1. Cài đặt Google Authenticator trên Server**
Chạy lệnh sau trên server để cài đặt Google Authenticator:
```bash
sudo apt update
sudo apt install libpam-google-authenticator
```

---

### **2. Cấu hình Google Authenticator cho tài khoản người dùng**
Sau khi cài đặt, chạy lệnh sau với user bạn muốn bật 2FA (ví dụ: `root`):
```bash
google-authenticator
```

Khi chạy lệnh này, bạn sẽ được hỏi một số câu hỏi. Dưới đây là gợi ý trả lời:
1. **"Do you want authentication tokens to be time-based (y/n)?"**  
   Nhập `y` (đồng ý sử dụng mã xác minh dựa trên thời gian).

2. **Mã QR Code và mã khôi phục (backup codes):**
   - Bạn sẽ thấy một mã QR xuất hiện trên màn hình.
   - **Dùng ứng dụng Google Authenticator** (hoặc một ứng dụng 2FA tương tự như Authy) để quét mã QR này.
   - Ghi lại **mã khôi phục** ở nơi an toàn. Mã này giúp bạn truy cập nếu mất ứng dụng 2FA.

3. **Các câu hỏi khác:**
   - "Do you want me to update your "/home/user/.google_authenticator" file (y/n)?" → Nhập `y`.
   - "Do you want to disallow multiple uses of the same OTP? (y/n)" → Nhập `y`.
   - "By default, tokens are good for 30 seconds..." → Nhập `n`.
   - "Do you want to enable rate-limiting..." → Nhập `y`.

---

### **3. Cấu hình PAM để bật Google Authenticator**
Chỉnh sửa file `/etc/pam.d/sshd`:
```bash
sudo nano /etc/pam.d/sshd
```

Thêm dòng sau vào cuối file (nếu chưa có):
```
auth required pam_google_authenticator.so
```

---

### **4. Bật Challenge-Response Authentication trong SSH**
Chỉnh sửa file cấu hình SSH `/etc/ssh/sshd_config`:
```bash
sudo nano /etc/ssh/sshd_config
```

Tìm và chỉnh sửa các dòng sau:
```plaintext
ChallengeResponseAuthentication yes
UsePAM yes
```

Đảm bảo chúng không bị comment (#) và được bật (`yes`).

---

### **5. Khởi động lại dịch vụ SSH**
Sau khi cấu hình xong, khởi động lại SSH để áp dụng thay đổi:
```bash
sudo systemctl restart ssh
```

---

### **6. Kiểm tra hoạt động**
1. Mở ứng dụng Google Authenticator (hoặc Authy) trên điện thoại.
2. Kết nối SSH tới server:
   ```bash
   ssh user@server_ip
   ```
3. Nhập mật khẩu bình thường, sau đó hệ thống sẽ yêu cầu nhập mã OTP từ ứng dụng Google Authenticator:
   ```plaintext
   Verification code: <nhập mã OTP>
   ```

---

### **7. Lưu ý bảo mật**
- Đảm bảo bạn **lưu mã khôi phục (backup codes)** ở nơi an toàn.
- Nếu mất ứng dụng Google Authenticator và không có mã khôi phục, bạn có thể bị khóa tài khoản.


