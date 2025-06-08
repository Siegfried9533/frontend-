"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
    const [selectedOption, setSelectedOption] = useState<"email" | "sms" | null>("email");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOption) {
            setMessage("Vui lòng chọn một tùy chọn để đặt lại mật khẩu.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            setMessage(`Link đặt lại mật khẩu đã được gửi qua ${selectedOption === 'email' ? 'email' : 'SMS'}.`);
        } catch (error) {
            setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[url('/images/backgrounds/background_login.jpg')] bg-cover bg-center flex items-center justify-center">
            {/* Optional: Semi-transparent overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}

            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div> {/* Adjust blur level here (sm, md, lg, xl) */}

            {/* Content layer (form) */}
            <div className="relative z-10 w-full flex justify-center px-4 py-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-dark p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col space-y-2 text-center">
                        <Link
                            href="/auth/sign-in"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Forgot Password
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Please Select option to send link reset password
                        </p>
                    </div>

                    <div className="grid gap-4 mt-6">
                        <div
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${selectedOption === 'email' ? 'border-primary' : 'border-border'}`}
                            onClick={() => setSelectedOption('email')}
                        >
                            <Mail className="h-6 w-6 text-muted-foreground" />
                            <div className="flex-1">
                                <h3 className="font-semibold">Reset via Email</h3>
                                <p className="text-sm text-muted-foreground">
                                    Link reset will be sent to your email address registered
                                </p>
                            </div>
                            {selectedOption === 'email' && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>

                        <div
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${selectedOption === 'sms' ? 'border-primary' : 'border-border'}`}
                            onClick={() => setSelectedOption('sms')}
                        >
                            <Phone className="h-6 w-6 text-muted-foreground" />
                            <div className="flex-1">
                                <h3 className="font-semibold">Reset via SMS</h3>
                                <p className="text-sm text-muted-foreground">
                                    Link reset will be sent to your phone number registered
                                </p>
                            </div>
                            {selectedOption === 'sms' && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>

                        <Button type="submit" disabled={isLoading} onClick={handleSubmit} className="mt-4">
                            {isLoading ? "Sending..." : "Send Link"}
                        </Button>

                        {message && (
                            <p className="text-sm text-center text-muted-foreground mt-4">
                                {message}
                            </p>
                        )}

                        <div className="text-center text-sm mt-4">
                            Didn't receive link?{" "}
                            <Link href="#" className="text-primary hover:underline">
                                Resend
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 