"use client";
import { EmailIcon, PasswordIcon } from "@/app/admin/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "@/components/ui/FormElements/InputGroup";
import { Checkbox } from "@/components/ui/FormElements/checkbox";

// Interface cho response từ API
interface LoginResponse {
  id: number;
  username: string;
  roles: string[];
  token: string;
}

interface SigninWithPasswordProps {
  onLogin: (userName: string, password: string) => Promise<void>;
  error: string;
  loading?: boolean;
}

export default function SigninWithPassword({ onLogin, error }: SigninWithPasswordProps) {
  const [data, setData] = useState({
    username: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting to login with:', { username: data.username });
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || '';
      console.log('API URL:', `${apiUrl}/api/auth/signin`);

      // Gọi API đăng nhập
      const response = await fetch(`${apiUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        credentials: 'include'
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Đăng nhập thất bại');
      }

      // Lưu token vào localStorage nếu remember me được chọn
      if (data.remember) {
        localStorage.setItem('token', responseData.token);
      } else {
        sessionStorage.setItem('token', responseData.token);
      }

      // Gọi callback onLogin
      await onLogin(data.username, data.password);
    } catch (err: any) {
      console.error('Login failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text"
        label="Username"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your username"
        name="username"
        handleChange={handleChange}
        value={data.username}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-1 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      {error && (
        <div className="mt-2 mb-4 text-red-500 text-sm text-center">{error}</div>
      )}

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 p-4 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}
