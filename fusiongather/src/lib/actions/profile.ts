"use server"

import { z } from "zod"
import { profileFormSchema } from "../validatior"
import getSession from "./getSession";


export const getUserProfile = async (userId: number) => {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    try {
        const res = await fetch(`${process.env.BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        });
        if (!res.ok) {
        console.error(`Request failed with status: ${res.status}`);
        return await res.json();
        }
        return await res.json();
    } catch (error: any) {
        console.log(error);
        return null;
    }

}

export const updateProfile = async (data: z.infer<typeof profileFormSchema>, userId: number) => {
    const session = await getSession();
    const sessionUser = session?.user;
    const accessToken = session?.tokens?.accessToken;
    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dob: data.dob,
        sessionUserId: sessionUser?.id,
    }
    try {
        const res = await fetch(`${process.env.BASE_URL}/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        });
        if (!res.ok) {
        console.error(`Request failed with status: ${res.status}`);
        return await res.json();
        }
        return await res.json();
    } catch (error: any) {
        console.log(error);
        return null;
    }
}