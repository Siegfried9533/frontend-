"use client";

import { GoogleIcon } from "@/app/admin/assets/icons";
import { signIn } from "next-auth/react";

export default function GoogleSigninButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-gray-300 bg-white p-4 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      <GoogleIcon />
      {text} with Google
    </button>
  );
}
