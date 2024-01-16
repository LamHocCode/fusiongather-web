import NextAuth from "next-auth"
import authConfig from '@/auth.config'
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT | null> {
    const res = await fetch(`${process.env.BASE_URL}/account/refresh`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token?.tokens?.refreshToken}`,
        },
    });

    const response = await res.json();

    if (response.tokens) {
        return {
            ...token,
            tokens: response.tokens,
        };
    } else {
        return null
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) return { ...token, ...user }
            if (new Date().getTime() < token?.tokens?.expriesIn) return token
            return await refreshToken(token)
        },

        async session({ token, session }: any) {
            session.user = token.user
            session.tokens = token.tokens
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    ...authConfig
})