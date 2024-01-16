'use server'

import { FieldValues } from "react-hook-form";

export const handleSignUpAction = async (data: FieldValues) => {
    const res = await fetch(`${process.env.BASE_URL}/account/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await res.json()
}

export const handleVerifyCodeAction = async (username: string, code: string) => {
    const res = await fetch(`${process.env.BASE_URL}/account/verify`, {
        method: "POST",
        body: JSON.stringify({
            username,
            verificationCode: code
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await res.json()
}

export const handleResetPasswordAction = async (email: string) => {
    const res = await fetch(`${process.env.BASE_URL}/account/reset-password`, {
        method: "POST",
        body: JSON.stringify({
            email
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return await res.json()
}

export const handleCheckCodeAction = async (email: string, code: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/account/reset-password/check-code`, {
            method: "POST",
            body: JSON.stringify({
                email,
                verificationCode: code
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return null;
        }
        return res.ok
    } catch (error: any) {
        console.log(error);
        return null
    }

}

export const handleNewPasswordAction = async (email: string, newPassword: string) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/account/reset-password/new-password`, {
            method: "POST",
            body: JSON.stringify({
                email,
                newPassword
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return null;
        }

        return res.ok
    } catch (error: any) {
        console.log(error);

        return null
    }
}
