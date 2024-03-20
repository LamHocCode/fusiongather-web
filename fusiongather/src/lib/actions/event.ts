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
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;

        const res = await fetch(`${process.env.BASE_URL}/event/pending`, {
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
        return res.json()
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const getLatestEvent = async () => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/event/latest`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 3
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

export const getEventById = async (id: number) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken
        const res = await fetch(`${process.env.BASE_URL}/event/${id}`, {
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
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const countFollower = async (eventId: number) => {
    try {
        const res = await fetch(`${process.env.BASE_URL}/followevent/count/${eventId}`, {
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

export const followEvent = async (eventId: number) => {
    try {
        const session = await getSession()
        const accessToken = session?.tokens?.accessToken
        const res = await fetch(`${process.env.BASE_URL}/followevent`, {
            method: "POST",
            body: JSON.stringify({ eventId }),
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
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const checkIsFollowed = async (eventId: number) => {
    try {
        const session = await getSession()
        const userId = session?.user?.id
        const accessToken = session?.tokens?.accessToken
        const res = await fetch(`${process.env.BASE_URL}/followevent/${userId}/${eventId}`, {
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
    } catch (error: any) {
        console.log(error);
        return null
    }
}

export const unFollowEvent = async (eventId: number) => {
    try {
        const session = await getSession()
        const userId = session?.user?.id
        const accessToken = session?.tokens?.accessToken
        const res = await fetch(`${process.env.BASE_URL}/followevent/${userId}/${eventId}`, {
            method: "DELETE",
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
    } catch (error: any) {
        console.log(error);
        return null
    }
}


