
# Cấu trúc Thư mục Dự án

Dưới đây là cấu trúc thư mục của dự án:

```
/apis
├── api.ts
└── axiosClient.ts
```

## Mô tả các Tệp

### `/apis/api.ts`
- Tệp này chứa các hàm API để tương tác với backend. Bạn có thể định nghĩa các endpoint.

### `axiosClient.ts`
- Tệp này cấu hình một instance của Axios để thực hiện các yêu cầu HTTP. Nó có thể bao gồm các thiết lập như interceptor cho yêu cầu và phản hồi, cũng như các cấu hình cơ bản khác như base URL hoặc timeout, phương thức HTTP (GET, POST, PUT, DELETE,...) và xử lý phản hồi từ server.

## Hình ảnh Cấu trúc Thư mục

![Hình ảnh cấu trúc thư mục 1](https://github.com/user-attachments/assets/fe518ce9-e868-43fa-a412-a0836966d09c)
![Hình ảnh cấu trúc thư mục 2](https://github.com/user-attachments/assets/118c9b77-10ba-4280-a2a4-65c99c3f6aa5)

## Mã Nguồn Ví dụ

### `/apis/api.ts`
```typescript
const baseURL = 'http://localhost:8000';

const endpoints = {
    // Auth
    login: '/auth/login/',
    users: '/user/',
    
    // Current user login
    currentUser: '/user/detail/',
    
    // Queue
    queues: '/queue/',
    queueApprove: '/queue/browse/',
    
    // Category (thể loại)
    categories: '/category/',
    category: '/category/:id/',
    
    // Role
    roles: '/role/',
    roleAddUserToManager: '/role/decentralize/',
};

export { baseURL, endpoints };
```

### `axiosClient.ts`
```typescript
import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./api";

// Function to create an Axios instance with a configured token
const authApi = (token: string | null = null) => {
    return axios.create({
        baseURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            // Xoá Content-Type tại đây để để cho axios tự thiết lập
        },
    });
};

// Function to handle API requests with support for different HTTP methods
const handleAPI = async (
    url: string,
    method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
    data?: any,
    token: string | null = null
) => {
    try {
        const apiInstance = authApi(token);
        const config: AxiosRequestConfig = {
            url,
            method,
            data,
        };
        const response = await apiInstance(config);
        return response.data;
    } catch (error) {
        // Handle error here (logging or custom error message)
        throw error;
    }
};

export default handleAPI;
export { handleAPI };
```
