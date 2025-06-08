import HeaderOne from "@/app/customer/components/headers/HeaderOne";
import Footer from "@/app/customer/components/footers/Footer";
import ScrollToTop from "@/app/customer/components/others/ScrollToTop";
import { Toaster } from "sonner";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderOne />
      {children}
      <Footer />
      <ScrollToTop />
      <Toaster position="top-right" duration={2000} />
    </div>
  );
}
