"use server"
import getSession from "./getSession";
export const createPaymentUrl = async (eventId: number) => {
  try {
  const session = await getSession();
  const accessToken = session?.tokens?.accessToken;
    const response = await fetch(`${process.env.BASE_URL}/payments/${eventId}/${session?.user.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create payment URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment URL:', error);
    throw error;
  }
};

