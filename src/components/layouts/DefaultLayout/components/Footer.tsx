// src/components/Footer.tsx
import LogoFooter from "@/assets/image/logo.svg";
import Image from "next/image";

const resources = [
  { name: "HOOKSTER", link: "https://youtub.com/" },
  { name: "DanhThuong", link: "https://youtub.com/" },
];

const followUs = [
  { name: "Github", link: "https://youtub.com/" },
  { name: "Discord", link: "https://youtub.com/" },
];

const legal = [
  { name: "Privacy Policy", link: "#" },
  { name: "Terms & Conditions", link: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-500 mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 flex flex-col items-start md:w-1/3">
            <a
              href="https://flowbite.com/"
              className="flex flex-col items-start"
            >
              <Image src={LogoFooter} alt="logo" height={200} width={250} />
              <span className="text-center text-sm text-white mt-2 w-[300px] h-[120px] overflow-hidden overflow-y-auto">
                Trong niềm hân hoan mừng kính Thánh Phanxicô Assisi – Bổn mạng
                gia đình Học viện, Học xá Học viện đã long trọng cử hành Thánh
                lễ tạ ơn mừng kính Thánh Bổn mạng vào lúc 10g00 thứ Bảy, ngày
                05.10.2024.
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 md:gap-4 md:flex-grow">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                Resources
              </h2>
              <ul className="text-white font-medium">
                {resources.map((item, index) => (
                  <li key={index} className="mb-2">
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                Follow us
              </h2>
              <ul className="text-white font-medium">
                {followUs.map((item, index) => (
                  <li key={index} className="mb-2">
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                Legal
              </h2>
              <ul className="text-white font-medium">
                {legal.map((item, index) => (
                  <li key={index} className="mb-2">
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white py-4 px-2 shadow-md">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2024{" "}
          <a
            href="https://www.facebook.com/XLR.Team"
            className="hover:underline"
          >
            HOOKSTER
          </a>{" "}
          &{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            DanhThuong
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
