
 
import React from "react";
import { EventType } from "@/lib/type";
import Checkout from "./Checkout";

function CheckoutButton({ event }: { event: EventType }) {

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const hasEventPublish = event.isPublished;
  return (
    <div className="flex items-center">
      {hasEventFinished || !hasEventPublish ? (
        <p className="p-2 cursor-pointer">
          {" "}
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <Checkout event = {event} />
      )}
    </div>
  );
}

export default CheckoutButton;
