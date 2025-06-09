import 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React context
     */
    interface Session {
        user: User & {
            id: string;
            username: string;
            roles: string[];
            accessToken: string;
        }
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React context
     */
    interface User {
        id: string;
        name: string;
        email: string;
        image?: string;
        username: string;
        roles: string[];
        accessToken: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        id: string;
        username: string;
        roles: string[];
        accessToken: string;
    }
} 