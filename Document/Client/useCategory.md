
# API Documentation: Category List

## 1. API Endpoint: Lấy Danh Sách Thể Loại

- **Method**: `GET`
- **URL**: `/category/`
- **Mô tả**: API này trả về danh sách các thể loại với các thuộc tính như `id`, `name`, và `image`.

### Request Headers

- **Authorization**: Token-based authentication (yêu cầu token).

### Response Example

Kết quả trả về dạng JSON:
```json
{
    "count": 4,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "7e4e2aab-be88-4c5c-928a-cf63a3c08ace",
            "name": "Test tạo 2",
            "image": "https://example.com/category/cube.png"
        },
        {
            "id": "c8a77e3d-bcf0-4111-8e69-7371a1992621",
            "name": "Test Tạo",
            "image": "https://example.com/category/cube.png"
        },
        {
            "id": "37005821-63d1-459b-8158-683dbfdf238b",
            "name": "Giáo hội Việt Nam",
            "image": null
        },
        {
            "id": "ab798222-b285-4472-bfbe-bc3086242f36",
            "name": "Nhà dòng",
            "image": null
        }
    ]
}
```

### Response Properties

- **count**: Tổng số lượng thể loại.
- **next**: URL của trang tiếp theo (nếu có).
- **previous**: URL của trang trước (nếu có).
- **results**: Mảng chứa các thể loại, mỗi thể loại có các thuộc tính:
  - `id`: ID của thể loại.
  - `name`: Tên của thể loại.
  - `image`: URL hình ảnh của thể loại (nếu có).

## 2. TypeScript Interfaces

Để đảm bảo kiểm soát chặt chẽ các kiểu dữ liệu trong TypeScript, khai báo các interfaces như sau:

```typescript
interface Category {
    id: number;
    name: string;
    image: string;
}

interface FetchCategoriesListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
}

interface Filters {
    [key: string]: string | number | string[] | undefined;
}
```

## 3. Custom Hooks

### Hook `fetchCategoriesList`

Hàm `fetchCategoriesList` được sử dụng để gửi yêu cầu API với bộ lọc và token được truyền vào.

```typescript
const fetchCategoriesList = async (
    pageParam: number = 1,
    token: string,
    filters: Filters
): Promise<FetchCategoriesListResponse> => {
    if (!token) {
        throw new Error("No token provided");
    }

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
        `${endpoints.categories}${queryString ? `?${queryString}` : ""}`,
        "GET",
        null,
        token
    );
    return response;
};
```

### Hook `useCategoriesList`

Custom hook `useCategoriesList` giúp truy xuất dữ liệu thể loại và cập nhật lại khi có sự thay đổi.

```typescript
const useCategoriesList = (page: number, filters: Filters = {}, refreshKey: number) => {
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

    return useQuery<FetchCategoriesListResponse, Error>({
        queryKey: ["categoriesList", token, page, filters, refreshKey],
        queryFn: async () => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return fetchCategoriesList(page, token, filters);
        },
        enabled: isReady && !!token,
        staleTime: 60000,
    });
};
```

### Component Sử Dụng Hook `useCategoriesList`

```typescript
import { useCategoriesList } from "@/hooks/category/useCategories";

export const CategoriesList = (currentPage: number, model: string, refreshKey: number) => {
    const { data, isLoading, isError } = useCategoriesList(currentPage, {
        model: [model],
    }, refreshKey);

    const categoriesData = data?.results || [];

    return { categoriesData, isLoading, isError };
};
```


## Tài liệu Custom Hook `useCategoriesList`

Custom hook `useCategoriesList` sẽ giúp bạn lấy dữ liệu danh sách thể loại từ API `/category/`, kết hợp với các bộ lọc và hỗ trợ sử dụng lại trong nhiều component. Hook này sử dụng React Query để xử lý việc truy xuất dữ liệu và caching.

### 1. Các Phần Import Cần Thiết


### 2. Custom Hook `fetchCategoriesList`

Custom hook `fetchCategoriesList` là hàm bất đồng bộ (async function) thực hiện gọi API và trả về dữ liệu. Hàm này sẽ:

- Kiểm tra token (yêu cầu bắt buộc).
- Áp dụng các bộ lọc hợp lệ từ `filters`.
- Tạo `queryString` từ `pageParam` và `filters` để gửi trong URL.
- Gọi API với `handleAPI` và trả về dữ liệu.

```typescript
const fetchCategoriesList = async (
    pageParam: number = 1,
    token: string,
    filters: Filters
): Promise<FetchCategoriesListResponse> => {
    if (!token) {
        throw new Error("No token provided");
    }

    // Lọc bỏ các giá trị undefined hoặc rỗng trong filters
    const validFilters = Object.fromEntries(
        Object.entries(filters).filter(
            ([, value]) => value !== undefined && value !== ""
        )
    );

    // Tạo chuỗi query
    const queryString = new URLSearchParams({
        page: pageParam.toString(),
        ...validFilters,
    }).toString();

    // Gọi API bằng handleAPI
    const response = await handleAPI(
        `${endpoints.categories}${queryString ? `?${queryString}` : ""}`,
        "GET",
        null,
        token
    );
    return response;
};
```

### 3. Custom Hook `useCategoriesList`

Custom hook `useCategoriesList` sử dụng `useQuery` từ `react-query` để quản lý truy vấn dữ liệu. Hook này bao gồm:

- **Lấy token từ `useAuth`**: Dùng `useAuth` để lấy token từ context hoặc auth provider.
- **Trạng thái token và kiểm tra sẵn sàng**: Dùng `useState` và `useEffect` để quản lý token và kiểm tra khi nào token sẵn sàng.
- **Dùng `useQuery` để gọi API**: Thực hiện gọi API thông qua `fetchCategoriesList`, và cấu hình các tùy chọn như `enabled`, `staleTime`.

```typescript
const useCategoriesList = (page: number, filters: Filters = {}, refreshKey: number) => {
    const { getToken } = useAuth(); // Dùng useAuth để lấy token
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    // Lấy token từ auth context và lưu vào state
    useEffect(() => {
        const fetchToken = async () => {
            const userToken = await getToken();
            setToken(userToken);
            setIsReady(true);
        };
        fetchToken();
    }, [getToken]);

    // Sử dụng useQuery để gọi API
    return useQuery<FetchCategoriesListResponse, Error>({
        queryKey: ["categoriesList", token, page, filters, refreshKey],
        queryFn: async () => {
            if (!token) {
                throw new Error("Token is not available");
            }
            return fetchCategoriesList(page, token, filters);
        },
        enabled: isReady && !!token, // Chỉ kích hoạt khi token sẵn sàng
        staleTime: 60000, // Dữ liệu sẽ không tải lại trong 60 giây
    });
};
```

#### Giải thích các Tham Số của `useCategoriesList`

- **page**: Số trang hiện tại được truyền vào để lấy dữ liệu từ API.
- **filters**: Bộ lọc tùy chọn để lọc kết quả từ API.
- **refreshKey**: Tham số để làm mới dữ liệu mỗi khi có thay đổi.

### 4. Component Sử Dụng Hook `useCategoriesList`

Ví dụ component sử dụng custom hook `useCategoriesList` để lấy dữ liệu danh sách thể loại và xử lý các trạng thái tải dữ liệu:

```typescript
import { useCategoriesList } from "@/hooks/category/useCategories";

export const CategoriesList = ({ currentPage, model, refreshKey }) => {
    const { data, isLoading, isError } = useCategoriesList(currentPage, { model: [model] }, refreshKey);

    const categoriesData = data?.results || []; // Dữ liệu danh sách thể loại

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading categories.</div>;

    return (
        <div>
            {categoriesData.map((category) => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    {category.image && <img src={category.image} alt={category.name} />}
                </div>
            ))}
        </div>
    );
};
```

#### Giải thích Component `CategoriesList`

- **Trạng thái tải (`isLoading`)**: Hiển thị nội dung “Loading…” khi đang tải dữ liệu.
- **Trạng thái lỗi (`isError`)**: Hiển thị thông báo lỗi nếu xảy ra lỗi trong quá trình tải dữ liệu.
- **Hiển thị danh sách thể loại**: Render danh sách các thể loại từ `categoriesData`, bao gồm `name` và `image` (nếu có).

---

Với các bước trên, bạn đã có custom hook `useCategoriesList` giúp gọi dữ liệu danh sách thể loại từ API, đồng thời sử dụng `react-query` để quản lý cache và trạng thái dữ liệu hiệu quả.

