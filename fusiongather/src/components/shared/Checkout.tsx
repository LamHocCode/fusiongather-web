import React, { useEffect, useState } from "react";

import { EventType } from "@/lib/type";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/payment";

import { loadStripe } from "@stripe/stripe-js";

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
      const paymentLink = await checkoutOrder(event.id);
      setPaymentLink(paymentLink);
      console.log("checkout", paymentLink);
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
