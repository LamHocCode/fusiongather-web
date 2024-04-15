import React from "react";
import { getRequestByEventId } from "@/lib/actions/booth";
import RequestTable from "@/components/main/RequestTable";
import { RequestType } from "@/lib/type";

interface Props {
  params: {
      id: number
  }
}

export async function generateMetadata({ params: { id } }: Props) {
  try {
      let request = id
      if (!request) {
          return {
              title: "Not Found",
              description: "The page you are looking for does not exist."
          }
      }
      return {
          title: String(id),
          description: String(id)
      }
  } catch (error: any) {
      return {
          title: "Not Found",
          description: "The page you are looking for does not exist."
      }
  }
}

export default async function RequestList({ params: { id } }: Props) {
  return (
    <>
      <section className="flex items-center justify-between">
        <RequestTable eventId={id}/>
      </section>   
    </>
  );
}

