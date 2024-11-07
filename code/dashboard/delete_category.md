

# Báo cáo: Chức năng Xóa Thể loại

## Mô tả Chức năng
Chức năng `DeleteCategory` cho phép người dùng xóa một thể loại dựa trên ID của thể loại và token xác thực của người dùng. Sau khi xóa thành công, danh sách các thể loại sẽ được tự động cập nhật.

## Cấu trúc Mã

### 1. Hàm `DeleteCategory`

```typescript
const DeleteCategory = async (categoryId: string, token: string) => {
    if (!token) throw new Error("No token available");

    try {
        const response = await handleAPI(
            `${endpoints.category.replace(":id", categoryId)}`,
            'DELETE',
            null,
            token
        );
        return response.data;
    } catch (error: any) {
        console.error('Error deleting category:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to delete category');
    }
};
```

#### Giải thích

1. **Tham số**
   - `categoryId`: Định danh của thể loại cần xóa.
   - `token`: Chuỗi xác thực của người dùng.

2. **Quy trình xử lý**
   - **Xác thực token**: Nếu `token` không tồn tại, hàm sẽ ném lỗi với thông báo "No token available".
   - **Gửi yêu cầu API**:
     - Hàm gọi `handleAPI` với phương thức `DELETE`, URL của thể loại cần xóa và token xác thực để gửi yêu cầu xóa đến API.
   - **Xử lý lỗi**: Nếu có lỗi từ API, lỗi sẽ được in ra console và ném ra lỗi chi tiết để hiển thị cho người dùng.

### 2. Hook `useDeleteCategory`

```typescript
const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const userToken = await getToken();
            setToken(userToken);
        };
        fetchToken();
    }, [getToken]);

    return useMutation({
        mutationFn: async (categoryId: string) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return DeleteCategory(categoryId, token);
        },
        onSuccess: () => {
            message.success("Xóa Thể Loại Thành Công!");
            queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
        },
        onError: (error: any) => {
            console.error(error.message || "Failed to delete category.");
        },
    });
};
```

#### Giải thích

1. **Các biến**
   - **`queryClient`**: Đối tượng từ `react-query` để quản lý và cập nhật cache.
   - **`getToken`**: Hàm lấy token từ context xác thực (`AuthContext`).
   - **`token`**: Token xác thực của người dùng, lưu trong state của hook.

2. **Quy trình xử lý**
   - **Lấy token**: `useEffect` được sử dụng để lấy token từ `getToken` và lưu vào `token`.
   - **Thiết lập `useMutation`**:
     - **`mutationFn`**: Hàm bất đồng bộ (`async`) thực hiện thao tác xóa thể loại.
       - Nếu không có `token`, hàm sẽ ném lỗi.
       - Nếu có `token`, `DeleteCategory` được gọi với tham số `categoryId` và `token`.
     - **`onSuccess`**: Sau khi xóa thành công, hiển thị thông báo thành công và làm mới (`invalidateQueries`) danh sách thể loại (`categoriesList`) từ cache.
     - **`onError`**: Nếu có lỗi, thông báo lỗi sẽ được hiển thị.

## Nguyên lý hoạt động
- Hàm `DeleteCategory` gửi yêu cầu xóa thể loại đến API và xử lý lỗi nếu có.
- Hook `useDeleteCategory` quản lý trạng thái và thực hiện thao tác xóa thông qua `useMutation` của `react-query`, giúp cập nhật giao diện khi thao tác thành công hoặc thất bại.

---

### **Lợi ích**
- **Quản lý token và xác thực**: Việc quản lý token tại cấp độ hook đảm bảo tính an toàn cho các thao tác liên quan đến xác thực.
- **Xử lý lỗi tốt**: Cả `DeleteCategory` và `useDeleteCategory` đều có cơ chế xử lý lỗi chi tiết, đảm bảo người dùng nhận được phản hồi chính xác khi thao tác không thành công.
- **Tự động cập nhật dữ liệu**: Sau khi thao tác xóa thành công, danh sách thể loại tự động làm mới thông qua cache `react-query`, giúp giao diện luôn được cập nhật.

