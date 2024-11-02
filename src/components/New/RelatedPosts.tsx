import React from "react";
import Container from "../Container/container";
import Image from "next/image";
import Banner from "@/assets/image/banner.png";

const RelatedPosts = () => {
  const mockArticles = [
    {
      id: 1,
      title:
        "Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày 08.12.2024",
      author: "DongDaMinh",
      date: "07/10/2024 19:28",
    },
    {
      id: 2,
      title: "Tin tức về hoạt động của Giáo hội tại Việt Nam",
      author: "TinTucGiaoHoi",
      date: "06/10/2024 10:15",
    },
    {
      id: 3,
      title: "Cập nhật từ Vatican về lễ hội Đức Mẹ Vô Nhiễm Nguyên Tội",
      author: "VaticanNews",
      date: "05/10/2024 15:00",
    },
    {
      id: 4,
      title: "Thông điệp của Đức Giáo hoàng cho Giáng sinh 2024",
      author: "GiangSinh2024",
      date: "04/10/2024 09:45",
    },
  ];
  return (
    <Container>
      <div className="pt-10">
        <div className="flex items-center justify-between py-10">
          <span className="relative lg:flex-row text-2xl font-bold text-primary-900 pb-2">
            TIN TỨC LIÊN QUAN
            <span className="absolute left-0 -bottom-1.5 w-full h-1 bg-yellow-400 transition-all duration-300" />
          </span>
          <button className="  rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
            Xem thêm
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mockArticles.map((article) => (
            <div key={article.id} className="rounded-lg flex flex-col gap-2">
              <div
                className="relative overflow-hidden w-full"
                style={{ height: "250px" }}
              >
                <Image
                  src={Banner}
                  alt="News Image"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                  layout="fill"
                />
              </div>
              <div className="w-50">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-xs">{article.author}</p>
                  <p>•</p>
                  <p className="text-[#9C9C9C] text-xs">{article.date}</p>
                </div>
                <h4 className="font-semibold">{article.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default RelatedPosts;
