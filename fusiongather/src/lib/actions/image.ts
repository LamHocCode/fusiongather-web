"use server"

import { z } from "zod";
import getSession from "./getSession";
import { GetAllEventType } from "../type";

export const getImagesByEventId = async (eventId: number) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken

        const res = await fetch(`${process.env.BASE_URL}/image/event/${eventId}`, {
            method: "GET",
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

export const getImagesByBoothId = async (boothId: number) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken

        const res = await fetch(`${process.env.BASE_URL}/image/booth/${boothId}`, {
            method: "GET",
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