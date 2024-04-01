
import React from "react";
import { getAttendeeByEventId } from "@/lib/actions/attendee";
import UsersTable from "@/components/main/attendee/UsersTable";

interface Props{
  params: {
    url: string;
  }
}


async function AttendeeList({params: {url}}: Props) {
  const tickets = await getAttendeeByEventId(1);
  const eventId = Number(url);
  return (
    <>
      <section className="flex items-center justify-between">
        <UsersTable tickets={tickets} eventId={eventId}/>
      </section>   
    </>
  );
}

export default AttendeeList;
