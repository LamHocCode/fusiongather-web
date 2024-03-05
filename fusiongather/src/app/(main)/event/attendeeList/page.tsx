
import React from "react";
import { getAttendeeByEventId } from "@/lib/actions/attendee";
import UsersTable from "@/components/main/attendee/UsersTable";

async function AttendeeList() {
  const ticket = await getAttendeeByEventId(1);
  return (
    <>
      <section className="flex items-center justify-between">
        <UsersTable/>
      </section>   
    </>
  );
}

export default AttendeeList;
