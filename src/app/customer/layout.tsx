import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ModalProvider from "@/app/customer/providers/ModalProvider";
import { AuthProvider } from "@/providers/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RGBunny",
  description: "your ultimate gadgets shop",
  //icon on tabs
  icons: {
    icon: '/images/favicon.ico',
  }
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased hide-scrollbar" style={{ fontFamily: 'var(--font-sans)' }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
          <ModalProvider />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
