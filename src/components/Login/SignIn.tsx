import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/image/logo.png";
import Image from "next/image";
import { PiEyeSlash } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Chỉnh sửa tên biến để đồng nhất

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-full flex items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="logo" height={90} width={150} />
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              Tên đăng nhập:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-2"
            >
              Mật khẩu:
            </label>
            <input
              type={showPassword ? "text" : "password"} // Sử dụng showPassword để quyết định type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-10"
            >
              {showPassword ? (
                <PiEyeSlash className="h-5 w-5 text-gray-600" />
              ) : (
                <RxEyeOpen className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-indigo-500 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href={"/reset"} className="text-indigo-500 hover:underline">
              Quên mật khẩu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
