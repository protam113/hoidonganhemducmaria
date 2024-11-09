// pages/hoidong/index.js
import Image from "next/image";
import React from "react";
import img from "@/assets/image/banner.png";
import Container from "@/components/Container/container";
import Link from "next/link";
import { articles } from "@/components/HoiDong/data";

const HoiDongPage = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary-900">
            Trang Hội Dòng
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Nội dung giới thiệu chung về Hội Dòng và lịch sử
          </p>
        </header>

        {/* Section Giới Thiệu về Hội Dòng */}
        <section
          id="gioi-thieu"
          className="mb-16 bg-gray-100 p-8 rounded-lg shadow-lg"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">
                Giới Thiệu về Hội Dòng
              </h2>
              <div className="text-gray-700">
                <p className="leading-relaxed mb-4">
                  Hội Dòng là một tổ chức tôn giáo quan trọng trong Giáo Hội
                  Công Giáo, với sứ mệnh mang lại niềm tin và yêu thương cho
                  cộng đồng. Các thành viên của Hội Dòng sống theo những nguyên
                  tắc và giáo lý của Giáo Hội, đồng thời tham gia vào nhiều hoạt
                  động giúp đỡ xã hội.
                </p>
                <p className="leading-relaxed">
                  Được thành lập từ những năm đầu thế kỷ 20, Hội Dòng đã đóng
                  góp tích cực trong các lĩnh vực giáo dục, chăm sóc sức khỏe và
                  hoạt động từ thiện, trở thành một phần không thể thiếu của
                  Giáo Hội Việt Nam.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 h-64 relative">
              <Image
                src={img}
                alt="Hình ảnh Giới Thiệu về Hội Dòng"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Main Content and Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Column */}
          <div className="w-full md:w-2/3 space-y-8">
            {/* Main Article Card */}
            {articles.map((article) => (
              <Link key={article.id} href={`/hoidong/${article.id}`} passHref>
                <div className="flex gap-4 border-b pt-6 pb-6 cursor-pointer">
                  <div className="flex-shrink-0 w-60 h-45 relative">
                    <Image
                      src={article.image}
                      alt="Hình ảnh"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-primary-900">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500">{article.date}</p>
                    <p className="text-gray-700 mt-2 line-clamp-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar - Right Column */}
          <div className="w-full md:w-1/3 space-y-8">
            {/* Tin/Bài mới nhất */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-md font-semibold text-primary-900 mb-4">
                TIN/BÀI MỚI NHẤT
              </h3>
              <ul className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <div className="flex-shrink-0 w-32 h-16 relative">
                      <Image
                        src={img}
                        alt="Hình ảnh nhỏ"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm line-clamp-3 font-semibold text-gray-700 hover:text-blue-600 cursor-pointer">
                        Chúa nhật 32 thường niên năm B - Hình ảnh "bà góa" trong
                        Kinh Thánh
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thông báo */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <h3 className="text-md font-semibold text-primary-900 mb-4">
                Thông Báo
              </h3>
              <ul className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="flex gap-3 items-center">
                    <div className="flex-shrink-0 w-32 h-16 relative">
                      <Image
                        src={img}
                        alt="Hình ảnh nhỏ"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm line-clamp-3 font-semibold text-gray-700 hover:text-blue-600 cursor-pointer">
                        Chúa nhật 32 thường niên năm B - Hình ảnh "bà góa" trong
                        Kinh Thánh
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HoiDongPage;
