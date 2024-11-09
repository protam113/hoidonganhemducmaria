"use client";
import React from "react";
import Image from "next/image";
import featuredImage from "@/assets/image/new.jpg"; // Replace with your featured image
import recentImage1 from "@/assets/image/banner.png";
import recentImage2 from "@/assets/image/banner.png";
import recentImage3 from "@/assets/image/banner.png";
import recentImage4 from "@/assets/image/banner.png";
import Container from "../Container/container";
import Link from "next/link"; // Import Link from Next.js

const FeaturedLayout = () => {
  const data = [
    {
      id: 1,
      image: recentImage1,
      date: "October 15, 2023",
      title: "Tìm hiểu về giáo lý cơ bản của Đạo giáo hội",
      description:
        "Khám phá các nguyên tắc và giáo lý cốt lõi của Đạo giáo hội và tầm ảnh hưởng của chúng đến đời sống tín đồ.",
    },
    {
      id: 2,
      image: recentImage2,
      date: "September 5, 2023",
      title: "Các nghi thức trong Đạo giáo hội: Ý nghĩa và tầm quan trọng",
      description:
        "Một cái nhìn sâu sắc về các nghi thức tôn giáo trong Đạo giáo hội và cách chúng kết nối tín đồ với đức tin.",
    },
    {
      id: 3,
      image: recentImage3,
      date: "August 20, 2023",
      title: "Đạo giáo hội và vai trò của cộng đồng trong đời sống tôn giáo",
      description:
        "Phân tích vai trò của cộng đồng trong Đạo giáo hội và cách nó ảnh hưởng đến sự phát triển tinh thần của tín đồ.",
    },
    {
      id: 4,
      image: recentImage4,
      date: "July 12, 2023",
      title: "Những người sáng lập và lãnh đạo nổi bật của Đạo giáo hội",
      description:
        "Tìm hiểu về những nhân vật quan trọng trong lịch sử Đạo giáo hội và những đóng góp của họ cho sự phát triển của tôn giáo.",
    },
  ];

  return (
    <Container>
      <div className="pt-10">
        <span className="relative lg:flex-row text-2xl font-bold text-primary-900 pb-2">
          TIN TỨC NỔI BẬT
          <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-yellow-400 transition-all duration-300" />
        </span>
        <div className="flex flex-col md:flex-row gap-4 pt-10">
          {/* Featured Post */}
          <div className="w-1/2 md:w-2/3 relative">
            <Image
              src={featuredImage}
              alt="Featured post"
              width={800}
              height={700}
              className="rounded-lg mb-3"
            />
            <p className="text-xs text-gray-500 mb-1">January 11, 2022</p>
            <h2 className="text-20 text-black font-bold mb-2">
              Tìm hiểu về giáo lý cơ bản của Đạo giáo hội
            </h2>
            <p className="text-sm">
              Đạo Giáo, hay còn gọi là Đạo Lão, là một trong những hệ thống
              triết lý và tôn giáo cổ xưa của Trung Quốc, chủ yếu dựa trên giáo
              lý của Lão Tử và tác phẩm `Đạo Đức Kinh`
            </p>
          </div>

          {/* Recent Posts */}
          <div className="md:w-1/3 space-y-5">
            {data.map((post, index) => (
              <div key={post.id} className="flex gap-2 items-start shadow-md">
                <Image
                  src={post.image}
                  alt={`Recent post ${index + 1}`}
                  width={135}
                  height={135}
                />
                <div>
                  <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                  <h3 className="text-md text-black font-semibold line-clamp-2 mb-5 leading-5">
                    {post.title}
                  </h3>
                  <Link href={`/post/${post.id}`} passHref>
                    <button className="text-white bg-primary-500 py-1 px-2 rounded-md text-xs hover:bg-yellow-500">
                      Xem Thêm
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedLayout;
