"use client";
import { useState } from "react";
import Container from "@/components/Blog/container";
import Link from "next/link";
import blogPosts from "@/components/Blog/blogData";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Thêm vào

export const getStaticProps = async () => {
  return {
    props: {
      posts: blogPosts,
    },
  };
};

const BlogPage = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Tính toán chỉ số bài viết hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Tính số trang tổng cộng
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Hàm chuyển trang
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary-900">Bài viết Blog</h1>
        <p className="mt-2 text-gray-600">
          Khám phá những thông tin chi tiết, bài viết và cập nhật mới nhất
        </p>

        {/* Thanh tìm kiếm */}
        <div className="relative mt-6 max-w-xs mx-auto">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-gray-100 text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute text-sm right-2 top-1.5 rounded-lg bg-primary-400 text-white py-1 px-3 transition hover:bg-yellow-400">
            Tìm
          </button>
        </div>
      </div>

      {/* Danh sách bài viết dạng 3 cột */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Thêm hiệu ứng chuyển động
      >
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            {/* Hình ảnh */}
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />

            {/* Nội dung bài viết */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold">
                {post.category}
              </div>
              <h2 className="text-xl line-clamp-2 font-semibold text-gray-800 mt-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
              {/* <p className="text-sm text-gray-500 mt-2">
                Tác giả: {post.author}
              </p> */}

              {/* Link tới bài viết chi tiết */}
              <Link href={`/blog/${post.id}`} passHref>
                <div className="text-primary-500 mt-4 inline-block transition hover:text-primary-600">
                  Đọc tiếp
                </div>
              </Link>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Phân trang */}
      <div className="flex justify-center mt-8 items-center space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowLeft />
        </button>

        {/* Các số trang */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Đăng ký nhận bản tin */}
      <div className="mt-12 p-6 bg-primary-500 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Đăng ký nhận bản tin</h2>
        <p className="mt-4 text-sm">
          Nhận thông báo về các bài viết mới nhất và cập nhật blog!
        </p>
        <div className="mt-4 flex">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none"
          />
          <button className="px-4 py-4  bg-yellow-400 text-gray-700 rounded-r-lg hover:bg-yellow-500 hover:text-white">
            Gửi
          </button>
        </div>
      </div>
    </Container>
  );
};

export default BlogPage;
