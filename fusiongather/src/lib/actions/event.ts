"use server";

import { z } from "zod";
import { eventFormSchema } from "../validatior";
import getSession from "./getSession";
import { GetAllEventType } from "../type";
import axios from "axios";
import { useRouter } from "next/navigation";

export const createEvent = async (data: z.infer<typeof eventFormSchema>) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;

    const res = await fetch(`${process.env.BASE_URL}/event/create`, {
      method: "POST",
      body: JSON.stringify(data),
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
};

export const getAllEvent = async (data: GetAllEventType) => {
  try {
    const { searchString, category, userId, pageNumber, pageSize } = data;

    const res = await fetch(
      `${process.env.BASE_URL}/event?searchString=${
        searchString ? searchString : ""
      }&category=${category ? category : ""}&userId=${
        userId ? userId : ""
      }&pageNumber=${pageNumber ? pageNumber : ""}&pageSize=${
        pageSize ? pageSize : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getAllCategory = async () => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;

    const res = await fetch(`${process.env.BASE_URL}/category`, {
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
};

export const getCategoryById = async (id: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;

    const res = await fetch(`${process.env.BASE_URL}/category/${id}`, { 
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
};

export const getPendingEvents = async () => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;

    const res = await fetch(`${process.env.BASE_URL}/event/pending`, {
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
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getLatestEvent = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/event/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3,
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
};

export const getEventById = async (id: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(`${process.env.BASE_URL}/event/${id}`, {
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
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const countFollower = async (eventId: number) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/followevent/count/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const followEvent = async (eventId: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const userId = session?.user?.id;
    const res = await fetch(`${process.env.BASE_URL}/followevent`, {
      method: "POST",
      body: JSON.stringify({ eventId, userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error(`Follow event failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const checkIsFollowed = async (eventId: number) => {
  try {
    const session = await getSession();
    if (!session) {
      return null;
    }
    const userId = session?.user?.id;
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(
      `${process.env.BASE_URL}/followevent/${userId}/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Check is follow failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const unFollowEvent = async (eventId: number) => {
  try {
    const session = await getSession();
    const userId = session?.user?.id;
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(
      `${process.env.BASE_URL}/followevent/${userId}/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const updateEventById = async (id: number, updatedEventData: any) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(`${process.env.BASE_URL}/event/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedEventData), // Gửi dữ liệu cập nhật dưới dạng JSON
    });
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(`${process.env.BASE_URL}/event/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getQRCodebyEventId = async (eventId: number) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/qr-code/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const qrCodeData = await res.text();
    return qrCodeData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const publishEvent = async (id: number) => {
  try {
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(
      `${process.env.BASE_URL}/event/publishEvent/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Request failed with status: ${res.status}`);
      return await res.json();
    }
    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getEventStatistic = async (eventId: number) => {
  try{
    const session = await getSession();
    const accessToken = session?.tokens?.accessToken;
    const res = await fetch(`${process.env.BASE_URL}/event/statistics/${eventId}`, {
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
    return res.json();
  }
  catch (error: any) {
    console.log(error);
    return null;
  }

}

export const checkIsEventOwner = async (ownerId: number) => {
  const session = await getSession();
  const userId = session?.user?.id;
  if (userId === ownerId) {
    return true;
  }
  return false;
};
