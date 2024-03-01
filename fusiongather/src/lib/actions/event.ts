"use server"

import { z } from "zod";
import { eventFormSchema } from "../validatior";
import getSession from "./getSession";
import { GetAllEventType } from "../type";

export const createEvent = async (data: z.infer<typeof eventFormSchema>) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken

        const res = await fetch(`${process.env.BASE_URL}/event/create`, {
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

export const getAllEvent = async (data: GetAllEventType) => {
    try {
        const { searchString, userId, pageNumber, pageSize } = data

        const res = await fetch(`${process.env.BASE_URL}/event?searchString=${searchString ? searchString : ''}&userId=${userId ? userId : ''}&pageNumber=${pageNumber ? pageNumber : ''}&pageSize=${pageSize ? pageSize : ''}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();;
        }
        return res.json()
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const getAllCategory = async () => {
    try {
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;

        const res = await fetch(`${process.env.BASE_URL}/category`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
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

export const getPendingEvents = async () => {
    try {

        const res = await fetch(`${process.env.BASE_URL}/event/pending`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();;
        }
        return res.json()
    } catch (error: any) {
        console.log(error);
        return null
    }
}



