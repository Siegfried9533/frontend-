import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    console.log('ProtectedRoute rendering:', { isAuthenticated, loading });

    useEffect(() => {
        console.log('ProtectedRoute useEffect running:', { isAuthenticated, loading });
        if (!loading && !isAuthenticated) {
            console.log('ProtectedRoute: Redirecting to /auth/sign-in');
            router.push('/auth/sign-in');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        console.log('ProtectedRoute: Showing loading...');
        return <div>Loading...</div>;
    }

    console.log('ProtectedRoute: Rendering children or null based on isAuthenticated');
    return isAuthenticated ? <>{children}</> : null;
} 