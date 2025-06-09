import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                    const res = await fetch(`${backendUrl}/api/auth/sign-in`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    const user = await res.json();

                    if (res.ok && user) {
                        // Đảm bảo trả về đúng format của User interface
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email || user.username, // Sử dụng username nếu không có email
                            username: user.username,
                            roles: user.roles,
                            accessToken: user.accessToken,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.roles = user.roles;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.roles = token.roles;
                session.user.accessToken = token.accessToken;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
