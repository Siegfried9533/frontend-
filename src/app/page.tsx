"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập
        if (isAuthenticated) {
            // Nếu là admin thì chuyển đến trang admin
            if (user?.roles?.includes('ADMIN')) {
                router.push('/admin');
            }
        } else {
            // Nếu chưa đăng nhập thì chuyển đến trang đăng nhập
            router.push('/customer');
        }
    }, [isAuthenticated, user, router]);

    // Hiển thị loading trong khi chuyển hướng
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        </div>
    );
} 