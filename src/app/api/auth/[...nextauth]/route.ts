/* import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log('Attempting authorization with credentials in next-auth:', credentials);

                if (!credentials) {
                    console.log('No credentials provided to next-auth authorize');
                    return null; // No credentials provided
                }

                try {
                    console.log('Calling backend signin API:', 'http://localhost:8080/api/auth/signin');
                    const backendResponse = await fetch('http://localhost:8080/api/auth/signin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: credentials.username, password: credentials.password })
                    });

                    console.log('Backend response status:', backendResponse.status);
                    const user = await backendResponse.json();
                    console.log('Backend response body:', user);

                    // If login is successful (backend status OK and backend indicates success)
                    if (backendResponse.ok) {
                        console.log('Backend signin successful. Returning user for next-auth session.');
                        // Return a user object that next-auth will put in the token/session
                        // Make sure this object contains properties needed in the session/JWT
                        return {
                            id: user.id,
                            name: user.username, // Use username for default name field
                            username: user.username,
                            roles: user.roles
                            // Add other properties if needed, but avoid sensitive data like raw token
                        };
                    } else {
                        // Backend returned a non-OK status (e.g., 401, 400) - authentication failed at backend
                        console.log('Backend signin failed with status:', backendResponse.status, 'and message:', user.message);
                        // You can throw an error with a specific message here if you want next-auth to expose it
                        // throw new Error(user.message || "Backend authentication failed");
                        return null; // Indicate authentication failure to next-auth
                    }
                } catch (error) {
                    console.error('Error calling backend signin API:', error);
                    // Throw error to indicate a problem during the process, not just auth failure
                    // throw new Error("Error communicating with authentication server");
                    return null; // Indicate authentication failure due to an error
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.roles = token.roles;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };  */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Debug environment variables
console.log('Environment Variables Check:');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('API_URL:', process.env.API_URL);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');

const handler = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log('Attempting authorization with credentials in next-auth:', credentials);
                console.log('Request headers:', req.headers);
                console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set');
                console.log('API_URL:', process.env.API_URL || 'http://localhost:8080');

                if (!credentials) {
                    console.log('No credentials provided to next-auth authorize');
                    return null;
                }

                try {
                    const backendUrl = process.env.API_URL || 'http://localhost:8080';
                    console.log('Calling backend signin API:', `${backendUrl}/api/auth/signin`);

                    const backendResponse = await fetch(`${backendUrl}/api/auth/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password
                        })
                    });

                    console.log('Backend response status:', backendResponse.status);
                    console.log('Backend response headers:', backendResponse.headers);

                    if (!backendResponse.ok) {
                        const errorData = await backendResponse.json();
                        console.error('Backend error:', errorData);
                        throw new Error(errorData.message || 'Authentication failed');
                    }

                    const user = await backendResponse.json();
                    console.log('Backend response body:', user);

                    if (user) {
                        return {
                            id: user.id,
                            name: user.username,
                            username: user.username,
                            roles: user.roles
                        };
                    }
                    return null;
                } catch (error: any) {
                    console.error('Error in authorize:', error);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.roles = token.roles;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }
});

export { handler as GET, handler as POST };
