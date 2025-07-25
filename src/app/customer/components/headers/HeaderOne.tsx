"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import Cart from "../carts/Cart";
import { ThemeToggle } from "../theme/ThemeToggle";
import AccountPopover from "../account/AccountPopover";
import { Search } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/app/customer/lib/utils";
import { useMobileSearchModal } from "@/app/customer/store/mobileSearchStore";
import Loader from "../others/Loader";
import DropdownMenuComponent from "../others/DropdownMenu";

const HeaderOne = () => {
  const pathname = usePathname();

  const links = [
    {
      label: "Home",
      link: "/",
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      link: "/shop",
      isActive: pathname.startsWith("/shop"),
    }
  ];

  const { openModal } = useMobileSearchModal();

  return (
    <header className="sticky bg-white dark:bg-slate-950 top-0 z-50 w-full">
      <div className="max-w-screen-xl mx-auto  p-4 md:py-4 md:px-8 flex items-center justify-between gap-2">
        <Link href={"/customer"} className="ml-2 min-[375px]:ml-4">
          <img
            src="/images/logo/logo_RGBunny.svg"
            alt="RGBunny logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-lg ">
          {links.map((link) => (
            <Link
              key={link.link}
              className={cn(
                "font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800",
                link.isActive && "bg-gray-200 dark:bg-gray-800  rounded-full"
              )}
              href={link.link}
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenuComponent />
        </ul>
        <div className="flex items-center gap-6 ">
          {/* mobile search option */}
          <div className="lg:hidden text-center">
            <Search size={25} onClick={openModal} />
          </div>
          {/* desktop search */}
          <div className="hidden lg:block">
            <Suspense fallback={<p>Loading...</p>}>
              <SearchBox />
            </Suspense>
          </div>
          <div className="flex items-center gap-6 lg:gap-2 lg:-mt-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <AccountPopover />
            <Cart />
            <MobileHeader />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default HeaderOne;
