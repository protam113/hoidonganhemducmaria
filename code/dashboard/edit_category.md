
# Báo cáo: Chức năng Chỉnh sửa Thể loại

## Mô tả Chức năng
Chức năng `EditCategory` cho phép người dùng chỉnh sửa một thể loại đã tồn tại trong hệ thống. Chức năng này nhận vào thông tin cập nhật của thể loại, định danh của thể loại (`categoryId`), và token xác thực của người dùng để gửi yêu cầu API. Sau khi cập nhật thành công, danh sách các thể loại sẽ được tự động cập nhật.

## Cấu trúc Mã

### 1. Hàm `EditCategory`

```typescript
const EditCategory = async (
    editCategory: EditCategoryItem,
    categoryId: string,
    token: string
) => {
    const formData = new FormData();

    if (!token) throw new Error("No token available");

    for (const key in editCategory) {
        if (Object.prototype.hasOwnProperty.call(editCategory, key)) {
            const value = editCategory[key as keyof EditCategoryItem];

            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(key, v));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === "string") {
                formData.append(key, value);
            }
        }
    }

    try {
        const response = await handleAPI(
            `${endpoints.category.replace(":id", categoryId)}`,
            "PATCH",
            formData,
            token
        );
        return response.data;
    } catch (error: any) {
        console.error("Error editing category:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to edit category");
    }
};
```

#### Giải thích

1. **Tham số**
   - `editCategory`: Đối tượng chứa thông tin cập nhật của thể loại.
   - `categoryId`: Định danh của thể loại cần chỉnh sửa.
   - `token`: Chuỗi xác thực của người dùng.

2. **Quy trình xử lý**
   - **Xác thực token**: Nếu `token` không tồn tại, hàm sẽ ném lỗi.
   - **Tạo `formData`**: Tạo một đối tượng `FormData` để xử lý các dữ liệu đa phương tiện hoặc chuỗi.
   - **Duyệt và thêm dữ liệu vào `formData`**:
     - Nếu giá trị là mảng, mỗi phần tử sẽ được thêm vào `formData`.
     - Nếu là tệp (`File`), tệp sẽ được thêm vào `formData`.
     - Nếu là chuỗi (`string`), chuỗi cũng được thêm vào `formData`.
   - **Gửi yêu cầu API**:
     - Hàm gọi `handleAPI` với phương thức `PATCH`, URL cập nhật, `formData`, và `token` xác thực để gửi yêu cầu cập nhật đến API.
   - **Xử lý lỗi**: Nếu có lỗi, mã sẽ hiển thị lỗi trong console và ném ra lỗi chi tiết để hiển thị cho người dùng.

### 2. Hook `useEditCategory`

```typescript
const useEditCategory = () => {
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
        mutationFn: async ({
                               editCategory,
                               categoryId,
                           }: {
            editCategory: EditCategoryItem;
            categoryId: string;
        }) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return EditCategory(editCategory, categoryId, token);
        },
        onSuccess: () => {
            message.success("Sửa Thể Loại Thành Công!");
            queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
        },
        onError: (error: any) => {
            message.error(error.message || "Failed to edit category.");
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
     - **`mutationFn`**: Hàm bất đồng bộ (`async`) thực hiện thao tác cập nhật thể loại.
       - Nếu không có `token`, hàm sẽ ném lỗi.
       - Nếu có `token`, `EditCategory` được gọi với các tham số `editCategory`, `categoryId`, và `token`.
     - **`onSuccess`**: Sau khi cập nhật thành công, hiển thị thông báo thành công và làm mới (`invalidateQueries`) danh sách thể loại (`categoriesList`) từ cache.
     - **`onError`**: Nếu có lỗi, thông báo lỗi sẽ được hiển thị.

## Nguyên lý hoạt động
- Hàm `EditCategory` gửi dữ liệu cập nhật đến API và xử lý các lỗi nếu xảy ra.
- Hook `useEditCategory` quản lý trạng thái và thực hiện thao tác cập nhật thông qua `useMutation` của `react-query`, cập nhật giao diện khi thao tác thành công hoặc thất bại.

---

### **Lợi ích**
- **Quản lý token và xác thực**: Việc quản lý token tại cấp độ hook đảm bảo an toàn cho dữ liệu và dễ dàng kiểm soát.
- **Xử lý lỗi tốt**: Cả `EditCategory` và `useEditCategory` đều có logic xử lý lỗi chi tiết, đảm bảo người dùng nhận được phản hồi chính xác khi thao tác không thành công.
- **Tự động cập nhật dữ liệu**: Sau khi thao tác thành công, danh sách thể loại tự động làm mới thông qua cache `react-query`, giúp giao diện luôn được cập nhật. 

