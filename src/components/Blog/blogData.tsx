// data/blogData.js

import blog from "@/assets/image/banner1.jpg";
const blogPosts = [
  {
    id: 1,
    title: "Hướng dẫn chi tiết về Next.js cho người mới bắt đầu",
    content: `
      Next.js là một framework mạnh mẽ dựa trên React, giúp bạn xây dựng các ứng dụng web nhanh chóng và hiệu quả. 
      Trong bài viết này, chúng ta sẽ đi qua các khái niệm cơ bản và cung cấp cho bạn một nền tảng vững chắc 
      để bắt đầu với Next.js. Hãy bắt đầu với việc cài đặt và cấu hình cơ bản, sau đó tìm hiểu các tính năng 
      quan trọng như routing, server-side rendering (SSR), static generation, và dynamic routing.
      
      ### Cài đặt Next.js
      Bạn có thể cài đặt Next.js bằng cách sử dụng npm hoặc yarn:
      
      \`\`\`bash
      npx create-next-app@latest
      \`\`\`
      
      ### Các tính năng nổi bật của Next.js
      1. **Routing**: Next.js cung cấp routing tự động dựa trên cấu trúc thư mục.
      2. **Server-Side Rendering (SSR)**: Next.js hỗ trợ SSR giúp tải trang nhanh hơn và cải thiện SEO.
      3. **Static Generation**: Tạo ra các trang tĩnh mà vẫn có thể nhận dữ liệu động.

      ### Kết luận
      Với các tính năng linh hoạt và dễ sử dụng, Next.js là một lựa chọn tuyệt vời cho các nhà phát triển React muốn 
      xây dựng ứng dụng web mạnh mẽ và tối ưu. Bắt đầu thử nghiệm với Next.js ngay hôm nay để khám phá thêm nhiều khả năng.
    `,
    image: blog,
    author: "Nguyễn Văn A",
    date: "07-11-2024",
    status: "NEWS",
    category: "Công nghệ",
    excerpt:
      "Khám phá cách xây dựng ứng dụng web với Next.js, từ cài đặt đến các tính năng nâng cao.",
  },
  {
    id: 2,
    title: "Bài viết 2",
    category: "Lập trình",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2... ",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 3,
    title: "Bài viết 3",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 4,
    title: "Bài viết 4",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 5,
    title: "Bài viết 5",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 6,
    title: "Bài viết 6",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 7,
    title: "Bài viết 7",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 8,
    title: "Bài viết 8",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 9,
    title: "Bài viết 9",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 10,
    title: "Bài viết 10",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 11,
    title: "Bài viết 11",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 12,
    title: "Bài viết 12",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 13,
    title: "Bài viết 10",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 14,
    title: "Bài viết 10",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
  {
    id: 15,
    title: "Bài viết 10",
    category: "Hội dòng",
    author: "Trần Thị B",
    excerpt: "Đây là đoạn trích của bài viết 2...",
    content: "Nội dung chi tiết của bài viết 2...",
    image: blog,
    date: "07-11-2024",
    status: "NEWS",
  },
];

export default blogPosts;
