```markdown
# Giải Thích Mã Nguồn: Lấy Danh Sách Vai Trò

Đoạn mã này định nghĩa các kiểu dữ liệu và hàm để lấy danh sách vai trò từ API, sử dụng TypeScript và React. Dưới đây là chi tiết từng phần:

## Các Interface

### `Role`
```typescript
interface Role {
    id: number;
    name: string;
    description: string;
}
```
- **Mô tả**: Giao diện `Role` định nghĩa cấu trúc của một đối tượng vai trò với các thuộc tính như:
  - `id`: định danh của vai trò.
  - `name`: tên của vai trò.
  - `description`: mô tả chi tiết về vai trò.

### `FetchRoleListResponse`
```typescript
interface FetchRoleListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Role[];
}
```
- **Mô tả**: Giao diện `FetchRoleListResponse` định nghĩa cấu trúc phản hồi khi gọi API để lấy danh sách các vai trò. Nó bao gồm:
  - `count`: tổng số vai trò có sẵn.
  - `next`: URL của trang tiếp theo (nếu có).
  - `previous`: URL của trang trước đó (nếu có).
  - `results`: mảng các đối tượng `Role`.

## Hàm `fetchRoleList`
```typescript
const fetchRoleList = async (pageParam: number = 1, token: string): Promise<FetchRoleListResponse> => {
    // ...
};
```
- **Mô tả**: Hàm `fetchRoleList` dùng để lấy danh sách vai trò từ API. Các tham số bao gồm:
  - `pageParam`: số trang (mặc định là 1).
  - `token`: token xác thực người dùng.

- **Chức năng**:
  1. Kiểm tra xem token có được cung cấp không; nếu không, ném ra lỗi.
  2. Thực hiện yêu cầu GET đến API với endpoint cho danh sách vai trò, bao gồm số trang trong chuỗi truy vấn.
  3. Trả về phản hồi từ API.

## Custom Hook `useRoleList`
```typescript
const useRoleList = (page: number) => {
    // ...
};
```
- **Mô tả**: `useRoleList` là một custom hook được sử dụng để lấy danh sách vai trò. Nó sử dụng React Query để quản lý trạng thái và hiệu suất dữ liệu.
- **Tham số**:
  - `page`: số trang cần lấy.

- **Chức năng**:
  1. Lấy token người dùng bằng hàm `getToken` từ hook xác thực.
  2. Thiết lập trạng thái `isReady` khi token được lấy thành công.
  3. Sử dụng `useQuery` từ React Query để quản lý việc lấy dữ liệu. Nếu token không có hoặc chưa sẵn sàng, yêu cầu sẽ không được thực hiện.
  4. Trả về kết quả của việc lấy danh sách vai trò.

## Kết Luận
Đoạn mã này giúp quản lý và lấy danh sách các vai trò từ một API với khả năng phân trang và xác thực. Custom hook `useRoleList` cung cấp một cách tiếp cận thuận tiện để tích hợp chức năng này vào các thành phần React.
