
## Báo Cáo Lỗi API

### Lỗi gặp phải:
- **API**: `/user/`
- **Phương thức**: `GET`
- **Lỗi trả về**: 400 Bad Request hoặc 500 Internal Server Error (tùy vào cấu hình backend)
- **Mô tả**: Khi thực hiện yêu cầu API với cURL, API không trả về kết quả như mong đợi và gặp lỗi trong quá trình phân trang hoặc xử lý tham số `role`.

### CURL Request:
```bash
curl "http://localhost:8000/user/?page=1&role=1&role=2" \
  -H "Accept: application/json, text/plain, */*" \
  -H "Accept-Language: vi,en;q=0.9,en-US;q=0.8" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMDY2NzEzLCJpYXQiOjE3MzE4OTM5MTMsImp0aSI6IjUxNGM3OTZhOTEzMjQ3YzM4NDViMzAyYTQwYjMzY2ViIiwidXNlcl9pZCI6ImZmNGNmM2ZiLThhYmEtNDAzZC1iYmZjLWNkYTA1ZTg0NTc2YSJ9.W9IXLBcbEp-Pc-32wt52O1PwevbzHSGMZI6x6p0kdDo" \
  -H "Connection: keep-alive" \
  -H "Origin: http://localhost:3000" \
  -H "Referer: http://localhost:3000/" \
  -H "Sec-Fetch-Dest: empty" \
  -H "Sec-Fetch-Mode: cors" \
  -H "Sec-Fetch-Site: same-site" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0" \
  -H "sec-ch-ua: \"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"" \
  -H "sec-ch-ua-mobile: ?0" \
  -H "sec-ch-ua-platform: \"Windows\""
```

### Mô tả lỗi:
Khi thực hiện gọi API `/user/` với tham số `role=1&role=2`, backend không xử lý đúng cách khi nhận nhiều giá trị cho một tham số, dẫn đến lỗi không phản hồi dữ liệu đúng hoặc trả về lỗi không mong muốn. Thông thường, backend chỉ nên xử lý một tham số `role` tại một thời điểm hoặc cần đảm bảo hỗ trợ việc nhận nhiều tham số cùng lúc.

### Các lỗi có thể xảy ra:
1. **Backend không hỗ trợ nhiều tham số giống nhau**:
   - Tham số `role=1&role=2` có thể không được xử lý đúng nếu backend chỉ mong đợi một giá trị duy nhất cho mỗi tham số.
   - Backend cần được cấu hình để xử lý nhiều giá trị cho cùng một tham số hoặc chuyển đổi tham số thành một danh sách.

2. **Lỗi phân trang**:
   - API có thể gặp lỗi khi nhận tham số phân trang và các tham số `role` đồng thời.
   - Cần đảm bảo rằng phân trang được xử lý chính xác và không bị ảnh hưởng bởi các tham số khác.

---

### Thắc mắc bổ sung: Tại sao Manager có thể tạo các thành phần mà không cần Admin duyệt?

**Mô tả**:
- Trong hệ thống hiện tại, Manager có quyền tạo các thành phần (components) mà không cần qua sự duyệt của Admin.
- Điều này có thể do quyền hạn của Manager được thiết lập cao hơn trong hệ thống phân quyền. Một số lý do có thể giải thích như sau:
  1. **Quyền hạn của Manager**: 
     - Manager có thể có quyền "tạo" và "quản lý" các thành phần trong hệ thống mà không cần sự phê duyệt của Admin. Điều này có thể phù hợp với quy trình quản lý và vận hành của tổ chức, nơi Manager được giao quyền tự chủ để thực hiện các thay đổi.
  2. **Thiết lập phân quyền**:
     - Quyền của Manager có thể được cấp theo mô hình vai trò (role-based access control), nơi Manager được phép thêm hoặc chỉnh sửa các thành phần mà không cần duyệt lại từ Admin.
  3. **Cải tiến quy trình làm việc**:
     - Có thể việc này nhằm tăng tốc độ và hiệu quả công việc, nơi Manager có thể thực hiện các thay đổi nhanh chóng mà không phải chờ Admin duyệt, đặc biệt khi Admin có thể không có thời gian hoặc không cần thiết phải kiểm tra từng thay đổi nhỏ.

**Đề xuất **:
- Sửa lại
