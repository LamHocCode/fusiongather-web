import { EventForm } from "@/components/shared/EventForm";
import React from "react";

function CreateEvent() {
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <EventForm type="Create" />
      </section>

    </>
  );
}

export default CreateEvent;
