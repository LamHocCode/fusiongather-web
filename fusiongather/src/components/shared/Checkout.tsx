import React, { useEffect, useState } from "react";

import { EventType } from "@/lib/type";
import { Button } from "../ui/button";
import { checkoutOrder, createFreeTicket } from "@/lib/actions/payment";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

interface CheckoutProps {
  event: EventType;
}

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Checkout({ event }: CheckoutProps) {
  const [paymentLink, setPaymentLink] = useState("");
  console.log("abccccccc",paymentLink);

  useEffect(() => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  }, [paymentLink]);

  const handleCheckoutClick = async () => {
    try {
      if (!event.isFree) {
      const paymentLink = await checkoutOrder(event.id);
      if (paymentLink?.statusCode === 403) {
        console.log("checkout", paymentLink?.error)
        toast.error(paymentLink?.error);
        return;
      }
      setPaymentLink(paymentLink);
      console.log("checkout", paymentLink);
      } else
      {
        const freeTicket = await createFreeTicket(event.id);
        console.log("freeTicket", freeTicket);
        if (freeTicket?.status === 403) {
          toast.error(freeTicket?.message);
          return;
        } else {
          toast.success("Get ticket successfully, check your email for more information!");
        } 
              
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Checkout for {event.title}
      </h2>
      <Button
        type="button"
        size="lg"
        className="button sm:w-fit"
        onClick={handleCheckoutClick}
      >
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </div>
  );
}

export default Checkout;
