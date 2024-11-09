"use client";

import LoginPage from "@/components/Login/SignIn";
import RegisterPage from "@/components/Register/SignUp";

const login = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <RegisterPage />
    </main>
  );
};

export default login;
