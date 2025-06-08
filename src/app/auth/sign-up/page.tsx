"use client"; // Mark as Client Component

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import GoogleSigninButton from "../components/GoogleSigninButton";
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { API_ENDPOINTS } from '@/config/api';
// You might need to import your specific form components (Input, Button, etc.)
// Example:
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

interface SignupRequest {
    username: string;
    email: string;
    password: string;
    role?: string[];
}

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<SignupRequest>({
        username: "",
        email: "",
        password: "",
        role: ["user"]
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const validatePassword = (password: string) => {
        if (password.length < 6 || password.length > 40) {
            return "Password must be between 6 and 40 characters";
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field error when user types
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }

        // Validate password on change
        if (name === "password") {
            const error = validatePassword(value);
            if (error) {
                setFieldErrors(prev => ({
                    ...prev,
                    [name]: error
                }));
            }
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate password
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setFieldErrors(prev => ({
                ...prev,
                password: passwordError
            }));
            setLoading(false);
            return;
        }

        // Validate passwords match
        if (formData.password !== confirmPassword) {
            setFieldErrors(prev => ({
                ...prev,
                confirmPassword: "Passwords do not match"
            }));
            setLoading(false);
            return;
        }

        try {
            const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, formData);
            console.log("Sign up successful:", response);
            router.push('/auth/sign-in');
        } catch (err: any) {
            console.error("Sign up failed:", err);
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            if (errorMessage.includes("password")) {
                setFieldErrors(prev => ({
                    ...prev,
                    password: errorMessage
                }));
            } else {
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Logo */}
            <Image
                src="/images/logo/logo_RGBunny.svg" // Replace with your logo path
                alt="Logo"
                width={100}
                height={40}
            />

            {/* Optional: Language Selector */}
            {/* <div className="self-end">Language Selector</div> */}

            {/* Heading */}
            <div className="text-center">
                <h1 className="text-2xl font-bold">Create Account</h1>
                <p className="text-sm text-muted-foreground">Welcome to UISOCIAL</p>
            </div>

            {/* Error message */}
            {error && (
                <div className="w-full p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            {/* Sign-up Form */}
            <form onSubmit={handleSignUp} className="w-full space-y-4">
                {/* Username Input */}
                <div className="space-y-1">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Username
                    </label>
                    <div className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border-none focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400 dark:bg-transparent dark:text-white"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Email
                    </label>
                    <div className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-none focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400 dark:bg-transparent dark:text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <div className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border-none focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400 dark:bg-transparent dark:text-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {fieldErrors.password && (
                        <p className="text-sm text-red-500 mt-1">{fieldErrors.password}</p>
                    )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                    </label>
                    <div className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800">
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border-none focus:outline-none focus:ring-0 text-sm placeholder:text-gray-400 dark:bg-transparent dark:text-white"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {fieldErrors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{fieldErrors.confirmPassword}</p>
                    )}
                </div>

                {/* Sign Up Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            {/* "or" separator */}
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-dark px-2 text-muted-foreground">
                    or
                </span>
            </div>

            {/* Login with Google button */}
            <GoogleSigninButton text="Sign up with Google" />
            {/* Google Icon Placeholder */}
            {/* <Image src="/path/to/google-icon.svg" alt="Google" width={16} height={16} className="mr-2" /> */}



            {/* "Already have an account? Sign In" link */}
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/auth/sign-in" className="text-primary hover:underline">
                    Sign In
                </Link>
            </div>

            {/* Social media icons */}
            {/* You will need to add your social media icon components */}
            <div className="flex space-x-4">
                {/* <FacebookIcon /> */}
                {/* <TwitterIcon /> */}
                {/* <LinkedinIcon /> */}
                {/* <InstagramIcon /> */}
            </div>
        </div>
    );
}