"use server";
import Stripe from "stripe";

import getSession from "./getSession";
import { redirect } from "next/navigation";

export const checkoutOrder = async (eventId: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const response = await fetch(
      `${process.env.BASE_URL}/payments/${eventId}/${session?.user.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create payment URL");
    }

    const paymentResponse = await response.json();
    console.log(paymentResponse);
    const paymentIntent = paymentResponse.paymentLink;
    console.log("abc",paymentIntent);
    if (!paymentIntent) {
      throw new Error("Payment link not found");
    }

    return paymentIntent
  } catch (error) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
};

export const createTicketAfterSuccessfulPayment = async (createTicketDto: any) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const response = await fetch(
      `${process.env.BASE_URL}/ticket/create`,
      {
        method: "POST",
        body: JSON.stringify(createTicketDto),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },   
      }
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
}
