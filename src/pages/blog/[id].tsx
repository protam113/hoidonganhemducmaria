// pages/blog/[id].js
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link
import blogPosts from "@/components/Blog/blogData"; // Import dữ liệu bài viết
import Image from "next/image";
import Container from "@/components/Container/container";
import { useState } from "react";

const PostDetail = () => {
  // State quản lý bình luận
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const router = useRouter();
  const { id } = router.query;

  // Tìm bài viết tương ứng với id
  const post = blogPosts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <p>Bài viết không tồn tại.</p>; // Nếu không tìm thấy bài viết
  }

  // Lọc ra các bài viết liên quan trừ bài viết hiện tại, lấy tối đa 4 bài viết
  const relatedArticles = blogPosts
    .filter((article) => article.id !== post.id)
    .slice(0, 4);

  // Hàm xử lý thêm bình luận
  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        author: "User", // Giả sử "User" là người dùng hiện tại
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentText(""); // Xóa nội dung sau khi thêm
    }
  };

  return (
    <Container>
      <div className="py-10">
        {/* Hiển thị thời gian và trạng thái bài viết */}
        <div className="flex items-center justify-center gap-4 text-gray-400 text-sm mb-4">
          <span>{post.date}</span> {/* Thời gian đăng */}
          <span className="bg-green-400 text-white py-1 px-2 rounded-full">
            {post.status}
          </span>{" "}
          {/* Trạng thái */}
        </div>

        {/* Tiêu đề bài viết */}
        <h1 className="text-3xl text-center font-bold text-gray-800">
          {post.title}
        </h1>

        {/* Thêm hình ảnh nếu có */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            className="mt-6 w-full h-full object-cover"
          />
        )}

        {/* Nội dung bài viết */}
        <p className="text-gray-600 mt-4">{post.content}</p>

        <p className="text-sm text-gray-500 mt-4">Tác giả: {post.author}</p>
      </div>

      {/* bình luận */}
      {/* Phần bình luận */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold">Bình luận</h3>

        {/* Hiển thị danh sách bình luận */}
        <div className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 py-2">
                <p className="text-sm text-gray-600">
                  {comment.author} - {comment.date}
                </p>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            ))
          ) : (
            <p>Chưa có bình luận nào.</p>
          )}
        </div>

        {/* Form thêm bình luận */}
        <div className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Nhập bình luận của bạn..."
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddComment}
          >
            Thêm bình luận
          </button>
        </div>
      </div>

      {/* bài viết liên quan */}
      <div>
        <div className="flex items-center justify-between py-10">
          <span className="relative lg:flex-row text-2xl font-bold text-primary-900 pb-2">
            BÀI VIẾT LIÊN QUAN
            <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-yellow-400 transition-all duration-300" />
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedArticles.map((article) => (
            <Link href={`/blog/${article.id}`} key={article.id}>
              <div className="rounded-lg flex flex-col gap-2 bg-white shadow-lg p-3">
                <div
                  className="relative overflow-hidden w-full"
                  style={{ height: "200px" }}
                >
                  <Image
                    src={article.image || "/default-image.jpg"}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-xs">{article.author}</p>
                    <p>•</p>
                    <p className="text-[#9C9C9C] text-xs">{article.date}</p>
                  </div>
                  <h4 className="font-semibold text-lg line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PostDetail;
