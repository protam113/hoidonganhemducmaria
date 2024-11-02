import Banner from "@/assets/image/banner.png";
import Image from "next/image";

// Dữ liệu giả cho các bài viết liên quan
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

export default function DetailPage() {
  return (
    <section className="mx-auto py-4 sm:py-16 lg:py-10">
      <article className="container mx-auto" style={{ width: "1200px" }}>
        {/* trạng thái, thời gian */}
        <div className="flex items-center justify-center gap-5">
          <div className="w-max px-3 py-1 rounded-lg bg-amber-200">
            <p>Popular Articles</p>
          </div>
          <p>October 23, 2023</p>
        </div>

        {/* Hình ảnh */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-800 py-5">
            Dòng Đa Minh có 3 tân Hồng y: Cha Timothy Radcliffe cùng với Tổng
            Giám mục Jean-Paul Vesco, và Tổng Giám mục Francis Leo sẽ được phong
            Hồng y
          </h1>
          <p className=" text-gray-600 pb-10">
            WĐMVN (06.10.2024) - Ngày 06.10.2024, sau Kinh Truyền tin, Đức Giáo
            hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày
            08.12.2024, nhân dịp Lễ Đức Mẹ Vô Nhiễm Nguyên Tội tại Vatican
          </p>
          <Image src={Banner} alt="news" width={500} height={300} />
        </div>
        <div
          className="prose-md container prose prose-lg mx-auto mt-8 max-w-6xl px-6 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: "<p>Nội dung bài viết về Next.js.</p>",
          }}
        />

        <Image src={Banner} alt="news" width={500} height={300} />
        {/* json  */}
        <div
          className="prose-md container prose prose-lg mx-auto mt-8 max-w-3xl px-6 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: "<p>Nội dung bài viết về Next.js.</p>",
          }}
        />

        <Image src={Banner} alt="news" width={500} height={300} />

        <div
          className="prose-md container prose prose-lg mx-auto mt-8 max-w-3xl px-6 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: "<p>Nội dung bài viết về Next.js.</p>",
          }}
        />

        <div>
          <div className="flex items-center justify-between py-10">
            <h3 className="text-20 font-bold">Liên quan</h3>
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
      </article>
    </section>
  );
}
