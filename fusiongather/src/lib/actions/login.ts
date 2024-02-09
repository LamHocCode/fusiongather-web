"use server"

import { FieldValues } from "react-hook-form";

import { signIn } from '@/auth'
import { AuthError } from "next-auth";

export const LoginAction = async (data: FieldValues) => {
    try {
        const { username, password } = data
        await signIn("credentials", {
            username,
            password,
            redirect: false
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    console.log(error);

                    return { error: "Something went wrong!" }
            }
        }
    }
}