import React, { useState } from 'react';
import axios from 'axios';

import { EventType } from '@/lib/type';
import { Button } from '../ui/button';
import { createPaymentUrl } from '@/lib/actions/payment'; // Import hàm createPaymentUrl

interface CheckoutProps {
  event: EventType;
}

function Checkout({ event }: CheckoutProps) {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleCheckout = async () => {
    try {
      // Gọi hàm createPaymentUrl để lấy URL thanh toán
      const response = await createPaymentUrl(event.id);
      
      // if (response.paymentLink) {
      //   window.location.href = response.paymentLink;
      // } else {
      //   console.error('Failed to get payment URL');
      // }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Checkout for {event.title}</h2>
      <Button onClick={handleCheckout}>Proceed to Payment</Button>
    </div>
  );
}

export default Checkout;
