
 
import React from "react";
import { EventType } from "@/lib/type";
import Checkout from "./Checkout";

function CheckoutButton({ event }: { event: EventType }) {

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          {" "}
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
        <Checkout event = {event} />
        </>
      )}
    </div>
  );
}

export default CheckoutButton;
