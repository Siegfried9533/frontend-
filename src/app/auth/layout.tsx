import "@/app/admin/css/satoshi.css";
import "@/app/admin/css/style.css";

import { Sidebar } from "@/app/admin/components/common/Layouts/sidebar";
import { Header } from "@/app/admin/components/common/Layouts/header";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | RGBunny",
    default: "RGBunny",
  },
  description:
    "Trang đăng ký - Website quản lý nhà sách - RGBunny.",
  icons: {
    icon: '/images/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <div className="flex min-h-screen">
            <main className="flex-1 flex items-center justify-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
