import Image from "next/image";
import bannerImage from "@/assets/image/banner.png";

const Hero = () => {
  return (
    <div className="flex justify-center py-10 cursor-pointer relative">
      {/* Phần hình ảnh lớn */}
      <div className="relative">
        <Image
          src={bannerImage}
          alt="Banner Image"
          className="rounded-sm"
          height={500}
          width={500}
          objectFit="cover"
        />
        {/* Thông báo ở giữa hình ảnh */}
        <div className="absolute top-20 -left-20 bg-secondary-50 p-4 rounded-lg text-black w-[300px] h-[250px] ">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-8 h-8 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="font-semibold mr-2 text-10">nudamin</p>
            <p className="text-[#9C9C9C] text-10">07/10/2024 19:28</p>
          </div>

          <h2 className="font-bold text-xs pt-1">
            Dòng Đa Minh có 3 tân Hồng y: Cha Timothy Radcliffe cùng với Tổng
            Giám mục Jean-Paul Vesco, và Tổng Giám mục Francis Lê
          </h2>
          <p className="text-10 pt-3 pb-1">
            WĐMVN (06.10.2024) - Ngày 06.10.2024, sau Kinh Truyền tin, Đức Giáo
            hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày
            08.12.2024, nhân dịp Lễ Đức Mẹ Vô Nhiễm Nguyên Tội tại Vatican. Công
            nghị này sẽ tấn phong 21 Hồng y mới, trong đó có Cha Timothy Peter
            Joseph Radcliffe, O.P. – Nguyên Bề Trên Tổng Quyền Dòng Đa Minh cùng
            với Đức Tổng Giám mục Jean-Paul Vesco –
          </p>
          <button className="font-bold text-xs">Đọc thêm</button>
        </div>
      </div>

      {/* Phần tin tức */}
      <div className="ml-4 grid gap-4 ">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg flex items-start gap-2 bg-secondary-50"
          >
            <Image
              src={bannerImage}
              alt="News Image"
              width={110}
              objectFit="cover"
              className="rounded-md"
            />
            <div className="w-50">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-xs">DongDaMinh</p>
                <p>•</p>
                <p className="text-[#9C9C9C] text-xs">07/10/2024 19:28</p>
              </div>
              <h4 className="font-semibold ">
                Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào
                ngày 08.12.2024
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
