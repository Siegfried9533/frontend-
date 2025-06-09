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
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
  icons: {
    icon: '/images/favicon.ico',
  }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrapper">
      <Providers>
        <NextTopLoader color="#5750F1" showSpinner={false} />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 2xl:p-10">
              <div className="mx-auto max-w-screen-2xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </Providers>
    </div>
  );
}
