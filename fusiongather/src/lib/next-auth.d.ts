import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            firstName: string,
            lastName: string,
            email: string
            dob: string,
            phoneNumber: string
        },
        tokens: {
            accessToken: string,
            refreshToken: string,
            expriesIn: number
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number,
            firstName: string,
            lastName: string,
            email: string
            dob: string,
            phoneNumber: string
        },
        tokens: {
            accessToken: string,
            refreshToken: string,
            expriesIn: number
        }
    }
}