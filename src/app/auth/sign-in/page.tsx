"use client";

import { useRouter } from 'next/navigation';
import Signin from "@/app/auth/components/Signin/index";
import Breadcrumb from "@/app/admin/components/common/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Hàm xử lý đăng nhập sử dụng fetch
  // Bước 1: Gửi request đăng nhập tới backend
  // Bước 2: Nhận response chứa token và roles
  // Bước 3: Lưu token và roles vào localStorage
  // Bước 4: Kiểm tra role, nếu là admin thì chuyển hướng sang trang admin, ngược lại chuyển sang trang customer
  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post<{ jwtToken: string; roles: string[] }>(
        "http://localhost:8080/api/auth/signin",
        { username, password }
      );
      console.log("RESPONSE DATA:", res.data);
      const { jwtToken: token, roles } = res.data;

      // Lưu token và roles vào localStorage để sử dụng cho các request sau
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));

      // Kiểm tra role, nếu là admin thì chuyển hướng sang trang admin
      if (roles.includes("ROLE_ADMIN")) {
        router.push("/admin");
      } else {
        router.push("/customer");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi trong quá trình đăng nhập");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[url('/images/backgrounds/background_login.jpg')] bg-cover bg-center">
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4">
          <Breadcrumb pageName="Sign In" />

          <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-wrap items-center">
              <div className="w-full xl:w-1/2">
                <div className="w-full p-2 sm:p-3 xl:p-4">
                  {/* Truyền hàm handleLogin vào component Signin */}
                  <Signin onLogin={handleLogin} error={error} loading={loading} />
                </div>
              </div>

              <div className="hidden w-full p-3 xl:block xl:w-1/2">
                <div className="custom-gradient-1 overflow-hidden rounded-2xl px-4 pt-4 dark:!bg-dark-2 dark:bg-none">
                  <Link className="mb-2 inline-block" href="/">
                    <Image
                      className="hidden dark:block"
                      src={"/images/logo/logo_RGBunny.svg"}
                      alt="Logo"
                      width={176}
                      height={32}
                    />
                    <Image
                      className="dark:hidden"
                      src={"/images/logo/logo_RGBunny.svg"}
                      alt="Logo"
                      width={100}
                      height={20}
                    />
                  </Link>
                  <p className="mb-1 text-base font-medium text-dark dark:text-white">
                    Sign in to your account
                  </p>

                  <h1 className="mb-1 text-lg font-bold text-dark dark:text-white sm:text-heading-3">
                    Welcome Back!
                  </h1>

                  <p className="w-full max-w-[375px] text-xs font-medium text-dark-4 dark:text-dark-6">
                    Please sign in to your account by completing the necessary
                    fields below
                  </p>

                  <div className="mt-8">
                    <Image
                      src={"/images/grids/grid-02.svg"}
                      alt="Logo"
                      width={405}
                      height={325}
                      className="mx-auto dark:opacity-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}