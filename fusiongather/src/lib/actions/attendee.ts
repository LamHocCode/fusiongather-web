"use server"

import { z } from "zod";
import getSession from "./getSession";

export const getAttendeeByEventId = async (eventId: number) => {

    try {
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;
        const res = await fetch(`${process.env.BASE_URL}/ticket/event/${eventId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
  
        if (!res.ok) {
            console.error(`Request failed with status: ${res.status}`);
            return await res.json();
        } else{
            console.log(`Attendee fetched successfully: ${res.status}`);
            return await res.json();
        }
    } catch (error: any) {
        console.log(error);
        return null;
    }
  }

export const deleteAttendee = async (attendeeId: number) => {
    try {
        const session = await getSession();
        const accessToken = session?.tokens?.accessToken;

        const res = await fetch(`${process.env.BASE_URL}/ticket/${attendeeId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    } catch (error: any) {
        console.log(error);
        throw new Error("Failed to delete attendee");
    }
}



