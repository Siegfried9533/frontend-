import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";

// Định nghĩa interface cho props của component Signin
interface SigninProps {
  onLogin: (userName: string, password: string) => Promise<void>; // Hàm xử lý đăng nhập
  error: string; // Thông báo lỗi nếu có
  loading: boolean; // Trạng thái loading khi đang xử lý đăng nhập
}

// Component chính xử lý giao diện đăng nhập
export default function Signin({ onLogin, error, loading }: SigninProps) {
  return (
    <>
      {/* Nút đăng nhập bằng Google */}
      <GoogleSigninButton text="Sign in" />

      {/* Phần ngăn cách giữa đăng nhập Google và đăng nhập email */}
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      {/* Form đăng nhập bằng email và mật khẩu */}
      <div>
        <SigninWithPassword onLogin={onLogin} error={error} loading={loading} />
      </div>

      {/* Link chuyển đến trang đăng ký */}
      <div className="mt-6 text-center">
        <p>
          Don't have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
