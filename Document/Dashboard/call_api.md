

# Hướng Dẫn Call API Lấy Danh Sách Bài Viết

## 1. **Cài đặt Môi Trường**
Trước khi sử dụng hook `useBlogList`, bạn cần đảm bảo rằng các dependencies cần thiết đã được cài đặt.

### Cài đặt Dependencies:
- `@tanstack/react-query`: Thư viện quản lý dữ liệu bất đồng bộ và cache.
- `antd`: Thư viện giao diện, được sử dụng để hiển thị các thông báo (message).
- `axios`: Được sử dụng để thực hiện các yêu cầu API.

```bash
npm install @tanstack/react-query antd axios
```

## 2. **Cấu Hình API Client**
API Client sẽ sử dụng `handleAPI` để thực hiện các yêu cầu API. Đảm bảo rằng bạn đã cấu hình `handleAPI` với axios.

**Ví dụ `handleAPI`**:

[Click here to view the handleAPI.ts file](./Document/Client/5-11%20docs.md)


## 3. **Tạo Các Interface**
Đảm bảo bạn đã khai báo các interface cần thiết cho dữ liệu mà bạn sẽ nhận được từ API.

**Ví dụ interface**:

```typescript
interface Category {
    id: number;
    name: string;
    file: string;
}

interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    profile_image: string;
}

interface BLogs {
    id: number;
    title: string;
    description: string;
    content: string;
    link: string;
    image: string | null;
    categories: Category[];
    user: User;
}

interface FetchBLogsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BLogs[];
}

interface Filters {
    [key: string]: string | number | string[] | undefined;
}
```

## 4. **Xây Dựng Hàm Fetch Blog List**
Hàm `fetchBloglist` sẽ gọi API để lấy danh sách bài viết.

**Hàm `fetchBloglist`**:

```typescript
const fetchBloglist = async (
    pageParam: number = 1,
    token: string,
    filters: Filters
): Promise<FetchBLogsListResponse> => {
    if (!token) {
        throw new Error("No token provided");
    }

    try {
        const validFilters = Object.fromEntries(
            Object.entries(filters).filter(
                ([, value]) => value !== undefined && value !== ""
            )
        );

        const queryString = new URLSearchParams({
            page: pageParam.toString(),
            ...validFilters,
        }).toString();

        const response = await handleAPI(
            `${endpoints.blogs}${queryString ? `?${queryString}` : ""}`,
            "GET",
            null,
            token
        );
        return response;
    } catch (error) {
        console.error("Error fetching blogs list:", error);
        throw error;
    }
};
```

## 5. **Xây Dựng Custom Hook `useBlogList`**
`useBlogList` là hook tùy chỉnh sử dụng `useQuery` để lấy dữ liệu danh sách bài viết từ API.

**Custom Hook `useBlogList`**:

```typescript
const useBlogList = (page: number, filters: Filters = {}, refreshKey: number) => {
    const { getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const fetchToken = async () => {
            const userToken = await getToken();
            setToken(userToken);
            setIsReady(true);
        };

        fetchToken();
    }, [getToken]);

    return useQuery<FetchBLogsListResponse, Error>({
        queryKey: ["blogList", token, page, filters, refreshKey], // Thêm refreshKey vào queryKey
        queryFn: async () => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return fetchBloglist(page, token, filters);
        },
        enabled: isReady && !!token,
        staleTime: 60000,
    });
};
```

### Giải thích:
- **`useQuery`**: Dùng để fetch dữ liệu từ API và lưu trữ trong cache.
- **`enabled`**: Đảm bảo rằng hook chỉ được gọi khi token đã được lấy và sẵn sàng.
- **`staleTime`**: Thời gian cache của dữ liệu (ở đây là 60 giây).

## 6. **Sử Dụng `useBlogList` trong Component**
Sử dụng `useBlogList` trong component để lấy danh sách bài viết từ API.

**Ví dụ Component**:

```tsx
import React, { useState } from "react";
import { useBlogList } from "@/hooks/useBlogList"; // Import hook

const BlogList = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Filters>({});
    const { data, isLoading, error } = useBlogList(page, filters, Date.now());

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching blogs</div>;

    return (
        <div>
            <h1>Danh Sách Bài Viết</h1>
            <ul>
                {data?.results.map((blog) => (
                    <li key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                    </li>
                ))}
            </ul>
            {data?.next && (
                <button onClick={() => setPage((prev) => prev + 1)}>
                    Next Page
                </button>
            )}
        </div>
    );
};

export default BlogList;
```

### Giải thích:
- **Sử dụng hook `useBlogList`** để lấy dữ liệu blog.
- **Xử lý trạng thái loading và error**: Hiển thị loading khi đang tải và lỗi nếu có vấn đề trong quá trình fetch dữ liệu.
- **Hiển thị danh sách bài viết**: Sử dụng `map` để hiển thị các bài viết từ `data.results`.
- **Cập nhật trang**: Chuyển trang khi có dữ liệu `next`.

