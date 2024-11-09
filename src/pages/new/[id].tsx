// // pages/news/[id].js
// import React from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import newsPosts from "@/components/New/Data"; // Dữ liệu bài viết

// const NewsDetail = () => {
//   const router = useRouter();
//   const { id } = router.query; // Lấy ID từ URL

//   // Tìm bài viết theo ID
//   const newsPost = newsPosts.find((post) => post.id === parseInt(id));

//   if (!newsPost) {
//     return <div>Không tìm thấy bài viết</div>; // Nếu không tìm thấy bài viết
//   }

//   return (
//     <div className="pt-10">
//       <div className="max-w-4xl mx-auto">
//         <Image
//           src={newsPost.image}
//           alt={newsPost.title}
//           width={800}
//           height={600}
//           className="rounded-lg"
//         />
//         <p className="text-xs text-gray-500 mt-2">{newsPost.date}</p>
//         <h1 className="text-3xl font-bold text-black mt-4">{newsPost.title}</h1>
//         <p className="text-md mt-4">{newsPost.excerpt}</p>
//       </div>
//     </div>
//   );
// };

// export default NewsDetail;
