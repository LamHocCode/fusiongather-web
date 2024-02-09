import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"

export default {
    trustHost: true,
    pages: {
        signIn: "/login",
        signOut: '/'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const { username, password } = credentials
                const res = await fetch(`${process.env.BASE_URL}/account/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                if (res.status === 404) {
                    return null
                }

                return await res.json()

            }
        })
    ]

} satisfies NextAuthConfig