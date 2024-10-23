
```markdown
# Cấu trúc thư mục của ứng dụng frontend (client)

```
/src
  ├─ /pages
  │   ├─ index.tsx      // route "/"
  │   ├─ about.tsx      // route "/about"
  │   ├─ /new
  │   │   ├─ index.tsx  // route "/new"
  │   │   └─ [id].tsx    // route "/new/:id"
  │   ├─ /blog
  │   │   ├─ index.tsx  // route "/blog"
  │   │   └─ [id].tsx    // route "/blog/:id"
  │   └─ _app.tsx       // optional, for global layout and providers
  ├─ /components
  │   └─ /layout
  │       └─ DefaultLayout.tsx
  └─ /styles
      └─ globals.css
```

## Giải thích cấu trúc thư mục

### `/src`
Thư mục gốc của ứng dụng, chứa tất cả các thành phần của ứng dụng.

### `/pages`
Thư mục này chứa tất cả các trang (components) của ứng dụng, mỗi tệp trong thư mục này tương ứng với một route cụ thể trong ứng dụng.

- **`index.tsx`**: Trang chính (route "/"). Đây là trang khởi đầu khi người dùng truy cập vào ứng dụng.
  
- **`about.tsx`**: Trang "Giới thiệu" (route "/about"). Trang này có thể chứa thông tin về ứng dụng hoặc tổ chức.

- **`/new`**: Thư mục con chứa các trang liên quan đến việc tạo nội dung mới.

  - **`index.tsx`**: Trang chính cho việc tạo nội dung mới (route "/new").
  
  - **`[id].tsx`**: Trang động, cho phép truy cập nội dung cụ thể bằng cách sử dụng một ID (route "/new/:id"). Điều này có thể dùng để chỉnh sửa một nội dung đã tồn tại.

- **`/blog`**: Thư mục con chứa các trang liên quan đến blog.

  - **`index.tsx`**: Trang chính của blog (route "/blog"), hiển thị danh sách các bài viết hoặc nội dung blog.
  
  - **`[id].tsx`**: Trang động cho phép truy cập đến một bài viết cụ thể bằng cách sử dụng ID (route "/blog/:id").

- **`_app.tsx`**: Tệp này tùy chọn, được sử dụng để định nghĩa layout toàn cục và các providers cho ứng dụng, như Context API hoặc các thư viện khác.

### `/components`
Thư mục này chứa các thành phần (components) tái sử dụng trong ứng dụng.

- **`/layout`**: Thư mục con chứa các thành phần liên quan đến layout.

  - **`DefaultLayout.tsx`**: Thành phần layout mặc định cho ứng dụng. Có thể được sử dụng để bao bọc các trang và cung cấp cấu trúc cơ bản (header, footer, sidebar, v.v.).

### `/styles`
Thư mục này chứa các tệp CSS để định kiểu cho ứng dụng.

- **`globals.css`**: Tệp CSS toàn cục cho ứng dụng, định nghĩa các kiểu và quy tắc CSS chung sẽ áp dụng cho tất cả các thành phần của ứng dụng.
```

### Ghi Chú
