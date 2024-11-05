```markdown
# Giải Thích Mã Nguồn: Lấy Danh Sách Người Dùng

Đoạn mã này định nghĩa các kiểu dữ liệu, hàm và custom hook để lấy danh sách người dùng từ API. Dưới đây là chi tiết từng phần:

## Các Interface

### `User`
```typescript
interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    profile_image: string;
    role: string;
}
```
- **Mô tả**: Giao diện `User` định nghĩa cấu trúc của một đối tượng người dùng với các thuộc tính như:
  - `id`: định danh của người dùng.
  - `username`: tên người dùng.
  - `first_name`: tên.
  - `last_name`: họ.
  - `email`: địa chỉ email.
  - `phone_number`: số điện thoại (có thể là null).
  - `profile_image`: URL đến hình ảnh đại diện.
  - `role`: vai trò của người dùng.

### `FetchUserListResponse`
```typescript
interface FetchUserListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: User[];
}
```
- **Mô tả**: Giao diện `FetchUserListResponse` định nghĩa cấu trúc phản hồi khi gọi API để lấy danh sách người dùng. Nó bao gồm:
  - `count`: tổng số người dùng có sẵn.
  - `next`: URL của trang tiếp theo (nếu có).
  - `previous`: URL của trang trước đó (nếu có).
  - `results`: mảng các đối tượng `User`.

### `Filters`
```typescript
interface Filters {
    role?: string[]; // Sử dụng mảng để lọc theo vai trò
    [key: string]: string | number | string[] | undefined;
}
```
- **Mô tả**: Giao diện `Filters` cho phép định nghĩa các bộ lọc cho việc lấy danh sách người dùng. Cụ thể:
  - `role`: một mảng chứa các vai trò mà người dùng muốn lọc.
  - Các thuộc tính khác có thể được thêm vào dưới dạng khóa-giá trị.

## Hàm `fetchUserList`
```typescript
const fetchUserList = async (
    pageParam: number = 1,
    token: string,
    filters: Filters
): Promise<FetchUserListResponse> => {
    // ...
};
```
- **Mô tả**: Hàm `fetchUserList` dùng để lấy danh sách người dùng từ API. Các tham số bao gồm:
  - `pageParam`: số trang (mặc định là 1).
  - `token`: token xác thực người dùng.
  - `filters`: bộ lọc cho việc tìm kiếm.

- **Chức năng**:
  1. Kiểm tra xem token có được cung cấp không; nếu không, ném ra lỗi.
  2. Tạo một đối tượng `URLSearchParams` để xây dựng chuỗi truy vấn.
  3. Xử lý các vai trò lọc, cho phép người dùng chỉ định nhiều vai trò.
  4. Thêm các bộ lọc khác vào chuỗi truy vấn nếu có.
  5. Thực hiện yêu cầu GET đến API với endpoint cho danh sách người dùng.
  6. Trả về phản hồi từ API.

## Custom Hook `useUserList`
```typescript
const useUserList = (page: number, filters: Filters = {}) => {
    // ...
};
```
- **Mô tả**: `useUserList` là một custom hook được sử dụng để lấy danh sách người dùng. Nó sử dụng React Query để quản lý trạng thái và hiệu suất dữ liệu.
- **Tham số**:
  - `page`: số trang cần lấy.
  - `filters`: các bộ lọc tùy chọn.

- **Chức năng**:
  1. Lấy token người dùng bằng hàm `getToken` từ hook xác thực.
  2. Thiết lập trạng thái `isReady` khi token được lấy thành công.
  3. Sử dụng `useQuery` từ React Query để quản lý việc lấy dữ liệu. Nếu token không có hoặc chưa sẵn sàng, yêu cầu sẽ không được thực hiện.
  4. Trả về kết quả của việc lấy danh sách người dùng.

## Kết Luận
Đoạn mã này giúp quản lý và lấy danh sách người dùng từ một API với khả năng phân trang và lọc theo vai trò. Custom hook `useUserList` cung cấp một cách tiếp cận thuận tiện để tích hợp chức năng này vào các thành phần React.
