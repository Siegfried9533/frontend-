"use client"; // Mark as Client Component

import { ReactNode } from "react";

export default function SignUpLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen w-screen">
            {/* Left column for background image/artwork */}
            <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-l-lg">
                {/* Placeholder for background image/artwork */}
                {/* You can add an Image component or a div with background styles here */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/default-auth-bg.jpg')" }}>
                    {/* Optional: overlay for the background */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                {/* Optional: Content or artwork on top of the background */}
                <div className="relative z-10 p-8 text-white">
                    {/* Add any elements like logos, text, etc. if needed */}
                </div>
            </div>

            {/* Right column for the form and content */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-dark rounded-r-lg">
                <div className="w-full max-w-md">
                    {/* children will be the content from page.tsx (the sign-up form) */}
                    {children}
                </div>
            </div>
        </div>
    );
}