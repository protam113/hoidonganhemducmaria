// src/components/LatestPosts.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import latestPostImage from "@/assets/image/banner1.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../Container/container";

const RecentLayout = () => {
  const postsPerPage = 9; // Thay đổi số lượng bài viết trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const latestPosts = [
    {
      title: "Đạo giáo hội là gì?",
      link: "/post-1",
      description:
        "Một cái nhìn tổng quan về đạo giáo hội và vai trò của nó trong xã hội.",
    },
    {
      title: "Sự phát triển của đạo giáo hội",
      link: "/post-2",
      description: "Lịch sử và sự phát triển của đạo giáo hội qua các thời kỳ.",
    },
    {
      title: "Những nguyên tắc cơ bản của đạo giáo hội",
      link: "/post-3",
      description: "Các nguyên tắc cơ bản mà đạo giáo hội theo đuổi.",
    },
    {
      title: "Vai trò của cộng đồng trong đạo giáo hội",
      link: "/post-4",
      description: "Tại sao cộng đồng là yếu tố quan trọng trong đạo giáo hội?",
    },
    {
      title: "Thực hành và nghi lễ trong đạo giáo hội",
      link: "/post-5",
      description: "Khám phá các nghi lễ và thực hành trong đạo giáo hội.",
    },
    {
      title: "Tương lai của đạo giáo hội",
      link: "/post-6",
      description:
        "Những thách thức và cơ hội cho đạo giáo hội trong thế kỷ 21.",
    },
    {
      title: "Tác động của đạo giáo hội đến văn hóa",
      link: "/post-7",
      description: "Đạo giáo hội ảnh hưởng như thế nào đến văn hóa và xã hội?",
    },
    {
      title: "Cách tham gia vào đạo giáo hội",
      link: "/post-8",
      description: "Hướng dẫn cho những ai muốn tham gia vào đạo giáo hội.",
    },
    {
      title: "Câu chuyện thành công từ đạo giáo hội",
      link: "/post-9",
      description: "Những câu chuyện thành công nổi bật trong đạo giáo hội.",
    },
    {
      title: "Thách thức mà đạo giáo hội đang đối mặt",
      link: "/post-10",
      description: "Các vấn đề hiện tại mà đạo giáo hội cần giải quyết.",
    },
    {
      title: "Đạo giáo hội và tâm linh",
      link: "/post-11",
      description: "Mối liên hệ giữa đạo giáo hội và các khía cạnh tâm linh.",
    },
    {
      title: "Những nhân vật tiêu biểu trong đạo giáo hội",
      link: "/post-12",
      description: "Các nhân vật có ảnh hưởng lớn đến đạo giáo hội.",
    },
    {
      title: "Phân tích văn bản của đạo giáo hội",
      link: "/post-13",
      description:
        "Cách tiếp cận để phân tích các văn bản quan trọng trong đạo giáo hội.",
    },
    {
      title: "Tài liệu tham khảo cho đạo giáo hội",
      link: "/post-14",
      description:
        "Một danh sách các tài liệu và nguồn lực hữu ích về đạo giáo hội.",
    },
    {
      title: "Các hội nghị và sự kiện về đạo giáo hội",
      link: "/post-15",
      description: "Thông tin về các hội nghị và sự kiện sắp diễn ra.",
    },
    {
      title: "Đạo giáo hội trong thời đại số",
      link: "/post-16",
      description: "Sự thích ứng của đạo giáo hội trong thời đại công nghệ.",
    },
    {
      title: "Sự kết nối giữa các tôn giáo",
      link: "/post-17",
      description:
        "Khám phá mối quan hệ giữa đạo giáo hội và các tôn giáo khác.",
    },
    {
      title: "Phương pháp giảng dạy trong đạo giáo hội",
      link: "/post-18",
      description:
        "Cách thức giảng dạy và truyền đạt kiến thức trong đạo giáo hội.",
    },
  ];

  const initialKeywords = [
    "Lịch sử hội dòng",
    "Giáo lý hội dòng",
    "Vai trò của hội dòng",
    "Nghi lễ hội dòng",
    "Tôn chỉ hoạt động",
  ];

  const [keywords, setKeywords] = useState(initialKeywords);

  const removeKeyword = (index) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setKeywords(initialKeywords);
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(latestPosts.length / postsPerPage);

  // Lấy danh sách bài viết cho trang hiện tại
  const currentPosts = latestPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Xử lý khi nhấn nút mũi tên trái
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Xử lý khi nhấn nút mũi tên phải
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <div className="pt-20">
        <span className="relative lg:flex-row text-2xl font-bold text-primary-900 pb-2">
          TIN TỨC MỚI NHẤT
          <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-yellow-400 transition-all duration-300" />
        </span>
        {/* Đường ngăn cách */}
        <div className="flex flex-col lg:flex-row gap-8 pt-10">
          {/* Left side: Filter section */}
          <div className="w-full lg:w-1/4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Danh mục</h3>
            <div className="space-y-4">
              {/* Checkbox Filter */}
              <div>
                <h4 className="font-bold mb-2">Sắp xếp theo</h4>
                <div>
                  <input type="checkbox" id="newest" name="newest" />
                  <label htmlFor="newest" className="ml-2">
                    Mới nhất
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="oldest" name="oldest" />
                  <label htmlFor="oldest" className="ml-2">
                    Cũ nhất
                  </label>
                </div>
              </div>

              {/* Left Filter */}
              <div>
                <h4 className="font-bold mb-2">Thể loại</h4>
                <select className="w-full p-2 rounded border">
                  <option value="all">Tất cả</option>
                  <option value="tech">Công nghệ</option>
                  <option value="design">Thiết kế</option>
                  <option value="lifestyle">Phong cách sống</option>
                </select>
              </div>

              {/* Sort Order Filter */}
              <div>
                <h4 className="font-bold mb-2">Sắp xếp</h4>
                <select className="w-full p-2 rounded border">
                  <option value="popularity">Phổ biến nhất</option>
                  <option value="latest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right side: Main content area */}
          <div className="flex-1 border border-gray-200 rounded-lg p-4">
            {/* Recommended Posts */}
            <div className="flex items-center gap-2 pb-4">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="relative">
                    <Link
                      href={`/search?query=${encodeURIComponent(keyword)}`}
                      className="text-accent"
                    >
                      <p className="bg-slate-200 text-black text-xs rounded-lg py-1 pl-2 pr-5 hover:bg-yellow-500 hover:text-white transition-colors">
                        {keyword}
                      </p>
                    </Link>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="absolute top-3 right-3 text-black text-sm rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleReset}
                className=" border border-gray-500 text-sm text-black py-1 px-4 rounded hover:bg-yellow-500 transition-colors hover:text-white hover:border-white"
              >
                Đặt lại
              </button>
            </div>

            {/* Latest Posts Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-lg overflow-hidden h-full w-full"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={latestPostImage}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    {/* Cập nhật link đến trang chi tiết */}
                    <Link href={`/post/${post.link.split("-")[1]}`}>
                      <h3 className="font-bold text-base line-clamp-2 pb-2 transition-colors duration-300 hover:text-yellow-500">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      href={`/post/${post.link.split("-")[1]}`}
                      className="text-accent mt-4 inline-block hover:text-yellow-500"
                    >
                      Đọc Thêm
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              key={currentPage} // Thay đổi key sẽ kích hoạt lại component
              initial={{ opacity: 0 }} // Giá trị khởi đầu
              animate={{ opacity: 1 }} // Giá trị kết thúc
              transition={{ duration: 0.5 }} // Thời gian chuyển đổi
            >
              {currentPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white  shadow rounded-lg overflow-hidden h-full w-full transition-transform duration-300 hover:shadow-lg" // Thêm hiệu ứng bóng đổ khi hover
                >
                  <div className="relative h-40 overflow-hidden">
                    {" "}
                    {/* Khung chứa hình ảnh */}
                    <Image
                      src={latestPostImage}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                  </div>
                  <div className="p-4 cursor-pointer">
                    <h3 className="font-bold text-base line-clamp-2 pb-2 transition-colors duration-300 hover:text-yellow-500">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.description}
                    </p>
                    <Link
                      className="text-accent mt-4 inline-block hover:text-yellow-500 transition-colors duration-300"
                      href={post.link}
                    >
                      Đọc Thêm
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Pagination */}
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
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecentLayout;
