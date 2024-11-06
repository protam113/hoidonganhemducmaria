

# Báo Cáo: Thêm Người Quản Lý (AddManager) trong Ứng Dụng

## Giới Thiệu

Đoạn mã này cung cấp một chức năng để thêm người quản lý vào một hệ thống quản lý người dùng. Đặc biệt, chức năng này sử dụng một API để thực hiện thao tác thêm người quản lý với các dữ liệu được gửi qua `FormData`. Mã nguồn bao gồm hai phần chính: **Hàm `AddManager`** và **Hook `useAddManager`**.

## 1. Hàm `AddManager`

### Mô Tả

Hàm `AddManager` là một hàm bất đồng bộ (`async`) thực hiện thao tác gửi dữ liệu lên API để thêm người quản lý vào hệ thống. Dữ liệu được gửi dưới dạng `FormData` để hỗ trợ việc truyền tải các tập tin (nếu có).

### Cấu Trúc

```typescript
const AddManager = async (addManager: AddManager, token: string) => {
    const formData = new FormData();

    // Duyệt qua các trường trong addManager và thêm vào formData
    for (const key in addManager) {
        const value = addManager[key];
        if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
        } else {
            formData.append(key, value);
        }
    }

    if (!token) throw new Error("No token available");

    try {
        const response = await handleAPI(`${endpoints.roleAddUserToManager}`, 'POST', formData, token);
        return response.data;
    } catch (error: any) {
        console.error('Error creating manager:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to create manager');
    }
};
```

### Giải Thích

- **Tham số `addManager`**: Dữ liệu của người quản lý sẽ được gửi lên API. Đây có thể là một đối tượng với các thuộc tính như tên, email, vai trò, v.v.
- **Duyệt qua các trường**: Chúng ta duyệt qua các thuộc tính của `addManager` và thêm chúng vào `FormData`. Nếu một trường có giá trị là mảng, mỗi phần tử trong mảng sẽ được thêm vào `FormData`.
- **Xử lý lỗi**: Nếu không có token, hàm sẽ ném ra lỗi. Nếu có lỗi trong quá trình gọi API, thông báo lỗi sẽ được in ra console và một lỗi mới sẽ được ném ra.

## 2. Hook `useAddManager`

### Mô Tả

`useAddManager` là một React Hook sử dụng `useMutation` của React Query để quản lý trạng thái khi thêm người quản lý. Hook này sẽ gọi hàm `AddManager` khi có yêu cầu và xử lý kết quả hoặc lỗi.

### Cấu Trúc

```typescript
const useAddManager = () => {
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
        mutationFn: async (addManager: AddManager) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return AddManager(addManager, token);
        },
        onSuccess: () => {
            console.log("Người quản lý đã được thêm thành công");
            queryClient.invalidateQueries({ queryKey: ["userList"] });
        },
        onError: (error) => {
            console.log(error.message || "Failed to add manager.");
        },
    });
};
```

### Giải Thích

- **Lấy Token**: Sử dụng `useEffect` để lấy token người dùng hiện tại thông qua `getToken()` từ hook `useAuth`. Token này được lưu trong state `token`.
- **Sử dụng `useMutation`**: Khi có yêu cầu thêm người quản lý, `useMutation` sẽ gọi hàm `AddManager` để thực hiện thao tác.
    - **`mutationFn`**: Gọi hàm `AddManager` với tham số `addManager` và token.
    - **`onSuccess`**: Nếu thao tác thành công, sẽ in ra thông báo và làm mới danh sách người dùng (`userList`) bằng cách invalidate cache.
    - **`onError`**: Nếu có lỗi, thông báo lỗi sẽ được in ra console.

## 3. Quy Trình Hoạt Động

1. **Lấy Token**: Khi hook `useAddManager` được gọi, hệ thống sẽ lấy token của người dùng hiện tại.
2. **Gửi Dữ Liệu**: Khi người dùng gửi dữ liệu thêm người quản lý, dữ liệu này sẽ được chuyển đến API thông qua `FormData`.
3. **Xử lý Phản Hồi**: Nếu API phản hồi thành công, dữ liệu sẽ được cập nhật, và danh sách người dùng sẽ được làm mới. Nếu có lỗi, hệ thống sẽ thông báo lỗi cho người dùng.

## 4. Kết Luận

Chức năng thêm người quản lý này sử dụng `FormData` để gửi dữ liệu lên API và đảm bảo tính bảo mật qua token. Việc sử dụng `useMutation` giúp dễ dàng quản lý trạng thái của thao tác thêm mới người quản lý và làm mới dữ liệu liên quan khi thao tác thành công.
