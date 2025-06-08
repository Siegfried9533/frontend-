"use client";

import "@/app/admin/css/satoshi.css";
import "@/app/admin/css/style.css";

import { Providers } from "../providers";
import { ReactNode } from "react";

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="h-screen overflow-hidden">
                <Providers>
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-md" style={{ backgroundImage: "url('/images/backgrounds/background_login.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <main className="flex-1 flex items-center justify-center">
                        {children}

                    </main>
                </Providers>
            </body>
        </html>
    );
}
