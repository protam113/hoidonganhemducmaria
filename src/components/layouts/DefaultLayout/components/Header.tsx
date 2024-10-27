import Image from "next/image";
import logo from "@/assets/image/logo.svg";
import { MdOutlineMail, MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import { FaPhoneVolume, FaSearch } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const TopHeader = () => {
  return (
    <div
      className="container mx-auto flex items-center justify-start py-5 text-black text-sm bg-white"
      style={{ maxWidth: "1600px" }}
    >
      <div className="flex items-center gap-1">
        <MdOutlineMail className="h-5 w-5" /> xlr.devteam03@devteam03gmail.com
        <FaPhoneVolume className="ml-5" />
        (+84) 377-783437
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <header className="sticky top-0 z-50  bg-primary-500">
      {/* Phần menu điều hướng */}
      <div className="bg-primary-500 py-5">
        <div className="container mx-auto" style={{ maxWidth: "1600px" }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Image src={logo} alt="logo" height={90} width={120} />

            {/* Navigation links */}
            <nav className="flex gap-10 text-white font-semibold text-base">
              <Link href={"/Trang Chủ"}>Trang Chủ</Link>
              <Link href={"/Tin Tức"}>Tin Tức</Link>
              <Link href={"/Hội Dòng"}>Hội Dòng</Link>
              <Link href={"/Hoạt Động"}>Hoạt Động</Link>
              <Link href={"/Quyên Góp"}>Quyên Góp</Link>
            </nav>

            <div className="flex items-center justify-center gap-4">
              {/* Menu Icon */}
              <Menu as="div" className="relative">
                <MenuButton>
                  <MdOutlineMenu className="h-8 w-8  cursor-pointer text-white" />
                </MenuButton>
                <MenuItems
                  as="div"
                  anchor="bottom"
                  className="flex bg-primary-500 w-full h-[60vh] absolute container mx-auto"
                >
                  <MenuItem>
                    <a
                      className="block data-[focus]:bg-blue-100"
                      href="/settings"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block data-[focus]:bg-blue-100"
                      href="/support"
                    >
                      Support
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      className="block data-[focus]:bg-blue-100"
                      href="/license"
                    >
                      License
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>

              <FaSearch className="h-5 w-5  text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
