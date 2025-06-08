import { AuthProvider } from '@/providers/AuthProvider';
import './globals.css';

export const metadata = {
    title: 'RGBunny Bookstore',
    description: 'Online Bookstore Management System',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
} 