import { BoothForm } from "@/components/shared/BoothForm";
import React from "react";
import { Metadata } from "next";
import { getEventById } from "@/lib/actions/event";

interface Props {
  params: {
      eventId: number
  }
}

export async function generateMetadata({ params: { eventId } }: Props): Promise<Metadata> {
  try {
      let booth = eventId
      if (!booth) {
          return {
              title: "Not Found",
              description: "The page you are looking for does not exist."
          }
      }
      return {
          title: String(eventId),
          description: String(eventId)
      }
  } catch (error: any) {
      return {
          title: "Not Found",
          description: "The page you are looking for does not exist."
      }
  }
}

export default async function CreateBooth({ params: { eventId } }: Props) {
  const event = await getEventById(eventId);
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <BoothForm type ="Create" eventId={eventId} event={event}/>
      </section>

    </>
  );
}


