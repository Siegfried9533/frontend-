import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React context
     */
    interface Session {
        user: {
            id: string; // Add id property
            username: string; // Add username property
            roles: string[]; // Add roles property
        } & DefaultSession['user']; // Keep the default properties
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React context
     */
    interface User extends DefaultUser {
        id: string; // Add id property
        username: string; // Add username property
        roles: string[]; // Add roles property
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        id: string; // Add id property
        username: string; // Add username property
        roles: string[]; // Add roles property
    }
} 