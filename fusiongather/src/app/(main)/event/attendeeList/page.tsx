import UsersTable from "@/components/shared/UsersTable";
import getSession from "@/lib/actions/getSession";

import React from "react";
import { Ticket } from "./columns";
import { getAttendeeByEventId } from "@/lib/actions/attendee";
import { auth } from "@/auth";



async function AttendeeList() {  
  const ticket = await getAttendeeByEventId(1);
  return (
    <>
      <section className="flex items-center justify-between">
        <UsersTable ticket={ticket}/>
      </section>   
    </>
  );
}

export default AttendeeList;
