import React from "react";
import Image from "next/image";
import recentImage from "@/assets/image/banner1.jpg";
const LessonPlan = () => {
  const lessons = [
    { id: 1, title: "Luyện tập chung trang", image: recentImage },
    {
      id: 2,
      title: "Bài 52. Sự sinh sản của động vật có hoa ",
      image: recentImage,
    },
    { id: 3, title: "Bài giảng 3", image: recentImage },
    { id: 4, title: "Bài giảng 4", image: recentImage },
    { id: 5, title: "Bài giảng 5", image: recentImage },
    { id: 6, title: "Bài giảng 6", image: recentImage },
  ];
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {" "}
      <h3 className="text-lg text-primary-800 font-semibold mb-4">
        Thư viện Giáo án ({lessons.length} bài)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 cursor-pointer rounded-lg">
        {/* Add gap for spacing */}
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="relative bg-white shadow cursor-pointer rounded-lg"
          >
            {/* Image container */}
            <div className="rounded-t-lg relative overflow-hidden w-full h-40">
              <Image
                src={lesson.image}
                alt={lesson.title}
                className=" transition-transform duration-300 ease-in-out hover:scale-110"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-md text-center font-bold line-clamp-2 text-primary-900 hover:text-yellow-500">
                {lesson.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonPlan;
