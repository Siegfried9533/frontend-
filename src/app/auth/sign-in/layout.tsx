import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign in",
};

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout will only render the children (the sign-in page content)
    // and will not include the Header and Sidebar from the parent layout.
    return <>{children}</>; // Sử dụng Fragment để trả về children trực tiếp
} 