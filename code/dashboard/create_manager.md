

# Báo Cáo: Tạo Người Quản Lý Mới (CreateManager) trong Ứng Dụng

## Giới Thiệu

Đoạn mã này cung cấp một hàm và một hook để tạo người quản lý mới trong hệ thống. Dữ liệu người quản lý mới được gửi thông qua `FormData`, và tất cả các thao tác gửi dữ liệu được thực hiện với việc xác thực token bảo mật. Hook `useCreateManager` giúp quản lý trạng thái khi tạo người quản lý và xử lý kết quả hoặc lỗi từ API.

## 1. Hàm `CreateManager`

### Mô Tả

Hàm `CreateManager` là một hàm bất đồng bộ (`async`) dùng để gửi dữ liệu tạo người quản lý lên API thông qua `FormData`. Dữ liệu của người quản lý được truyền dưới dạng đối tượng `newManager` và cần phải có một token xác thực để thực hiện yêu cầu này.

### Cấu Trúc

```typescript
const CreateManager = async (newManager: NewManager, token: string) => {
    const formData = new FormData();

    // Duyệt qua các trường trong newManager và thêm vào formData
    for (const key in newManager) {
        const value = newManager[key];
        if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
        } else {
            formData.append(key, value);
        }
    }

    if (!token) throw new Error("No token available");

    try {
        const response = await handleAPI(`${endpoints.users}`, 'POST', formData, token);
        return response.data;
    } catch (error: any) {
        console.error('Error creating manager:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to create manager');
    }
};
```

### Giải Thích

- **Tham số `newManager`**: Đây là dữ liệu của người quản lý mới, có thể là một đối tượng với các trường như tên, email, vai trò, hoặc các thuộc tính khác.
- **Duyệt qua các trường**: Chúng ta duyệt qua các trường của đối tượng `newManager` và thêm từng trường vào `FormData`. Nếu một trường có giá trị là mảng, mỗi phần tử trong mảng sẽ được thêm vào `FormData`.
- **Xử lý lỗi**: Hàm kiểm tra xem có token hay không. Nếu không có token, hàm sẽ ném ra lỗi. Nếu có lỗi trong quá trình gọi API, thông báo lỗi sẽ được in ra console và một lỗi mới sẽ được ném ra.

## 2. Hook `useCreateManager`

### Mô Tả

`useCreateManager` là một React Hook sử dụng `useMutation` từ React Query để quản lý trạng thái khi tạo người quản lý mới. Hook này sử dụng `CreateManager` để gửi dữ liệu lên API và xử lý kết quả hoặc lỗi.

### Cấu Trúc

```typescript
const useCreateManager = () => {
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
        mutationFn: async (newManager: NewManager) => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return CreateManager(newManager, token);
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

- **Lấy Token**: Sử dụng `useEffect` để lấy token người dùng hiện tại thông qua `getToken()` từ hook `useAuth`. Token này sẽ được lưu trong state `token`.
- **Sử dụng `useMutation`**: Khi có yêu cầu thêm người quản lý, `useMutation` sẽ gọi hàm `CreateManager` để thực hiện thao tác.
    - **`mutationFn`**: Gọi hàm `CreateManager` với tham số `newManager` và token.
    - **`onSuccess`**: Nếu thao tác thành công, sẽ in ra thông báo và làm mới danh sách người dùng (`userList`) bằng cách invalidate cache.
    - **`onError`**: Nếu có lỗi, thông báo lỗi sẽ được in ra console.

## 3. Quy Trình Hoạt Động

1. **Lấy Token**: Khi hook `useCreateManager` được gọi, hệ thống sẽ lấy token của người dùng hiện tại.
2. **Gửi Dữ Liệu**: Khi người dùng gửi dữ liệu tạo người quản lý mới, dữ liệu này sẽ được chuyển đến API thông qua `FormData`.
3. **Xử lý Phản Hồi**: Nếu API phản hồi thành công, dữ liệu sẽ được cập nhật và danh sách người dùng sẽ được làm mới. Nếu có lỗi, hệ thống sẽ thông báo lỗi cho người dùng.

## 4. Kết Luận

Chức năng tạo người quản lý này sử dụng `FormData` để gửi dữ liệu lên API và yêu cầu có token bảo mật để đảm bảo tính an toàn. Việc sử dụng `useMutation` giúp dễ dàng quản lý trạng thái của thao tác thêm mới người quản lý và làm mới dữ liệu liên quan khi thao tác thành công. Điều này giúp cho việc tạo và quản lý người quản lý trong hệ thống trở nên mượt mà và an toàn hơn.
