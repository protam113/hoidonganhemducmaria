// pages/hoidong/[id].js
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Container from "@/components/Container/container";
import { articles } from "@/components/HoiDong/data";

const ArticleDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Tìm bài viết theo ID
  const article = articles.find((article) => article.id === id);

  if (!article) {
    return <p>Bài viết không tồn tại</p>;
  }

  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900">
            {article.title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">{article.date}</p>
        </header>

        {/* Image */}
        <div className="w-full h-96 relative mb-8">
          <Image
            src={article.image}
            alt="Banner bài viết"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="text-lg text-gray-800">
          {article.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ArticleDetail;
