
import React from "react";
import { getAttendeeByEventId } from "@/lib/actions/attendee";
import UsersTable from "@/components/main/attendee/UsersTable";

interface Props{
  params: {
    url: string;
  }
}


async function AttendeeList({params: {url}}: Props) {
  const eventId = Number(url);
  return (
    <>
      <section className="flex items-center justify-between">
        <UsersTable eventId={eventId}/>
      </section>   
    </>
  );
}

export default AttendeeList;
