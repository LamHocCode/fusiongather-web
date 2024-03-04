import { z } from "zod";
import { boothFormSchema } from "../validatior";
import getSession from "./getSession";
import {  } from "../type"

export const createBooth = async (data: z.infer<typeof boothFormSchema>) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken

        const res = await fetch(`${process.env.BASE_URL}/booth`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();
        }
        return await res.json()
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const getAllBooth = async () => {
    try {
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;

        const res = await fetch(`${process.env.BASE_URL}/booth`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();;
        }
        return res.json()
    }
    catch (error: any) {
        console.log(error);
        return null
    }
}

export const getBoothByEventId = async (eventId: number) => {
    try {
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;

        const res = await fetch(`${process.env.BASE_URL}/booth/event/${eventId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();;
        }
        return res.json()
    }
    catch (error: any) {
        console.log(error);
        return null
    }
}
