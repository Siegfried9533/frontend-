"use client";

import { ChevronUpIcon } from "@/app/admin/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/app/admin/components/common/ui-elements/dropdown";
import { cn } from "@/app/admin/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { User2 } from "lucide-react";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    img: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("http://localhost:8080/api/account/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Không thể lấy thông tin user");
        const data = await res.json();
        setUser({
          name: data.name || data.username || "Admin",
          email: data.email || "",
          img: data.profilePhoto || "",
        });
      } catch (err) {
        // Nếu lỗi, giữ nguyên dữ liệu mặc định
      }
    };
    fetchProfile();
  }, []);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>
        <figure className="flex items-center gap-3">
          {user.img ? (
            <Image
              src={user.img}
              className="size-12"
              alt={`Avatar of ${user.name}`}
              role="presentation"
              width={200}
              height={200}
            />
          ) : (
            <div className="size-12 flex items-center justify-center bg-gray-200 rounded-full">
              <User2 size={40} className="text-gray-400" />
            </div>
          )}
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{user.name}</span>
            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>
      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>
        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          {user.img ? (
            <Image
              src={user.img}
              className="size-12"
              alt={`Avatar for ${user.name}`}
              role="presentation"
              width={200}
              height={200}
            />
          ) : (
            <div className="size-12 flex items-center justify-center bg-gray-200 rounded-full">
              <User2 size={40} className="text-gray-400" />
            </div>
          )}
          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {user.name}
            </div>
            <div className="leading-none text-gray-6">{user.email}</div>
          </figcaption>
        </figure>
        <hr className="border-[#E8E8E8] dark:border-dark-3" />
        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="mr-auto text-base font-medium">View profile</span>
          </Link>
          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="mr-auto text-base font-medium">Account Settings</span>
          </Link>
        </div>
        <hr className="border-[#E8E8E8] dark:border-dark-3" />
        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <LogOutIcon />
            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
