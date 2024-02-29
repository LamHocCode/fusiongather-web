import UsersTable from "@/components/shared/UsersTable";
import getSession from "@/lib/actions/getSession";

import React from "react";
import { Ticket } from "./columns";

export const getAttendeeByEventId = async () => {

  try {
      const session = await getSession();
      const accessToken = session?.tokens?.accessToken;

      const res = await fetch(`${process.env.BASE_URL}/ticket/event/1`, {
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

async function AttendeeList() {
  const ticket = await getAttendeeByEventId();
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <UsersTable ticket={ticket}/>
      </section>

    </>
  );
}

export default AttendeeList;
