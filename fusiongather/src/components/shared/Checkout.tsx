import React, { useState } from 'react';
import axios from 'axios';

import { EventType } from '@/lib/type';
import { Button } from '../ui/button';
import { createPaymentUrl } from '@/lib/actions/payment';

interface CheckoutProps {
  event: EventType;
}

function Checkout({ event }: CheckoutProps) {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handleCheckout = async () => {
   await createPaymentUrl(100, event.title, 'payment', 'vn')
   console.log("dc roi")
    // amount: 100, // Thay 100 bằng số tiền cần thanh toán
    //     orderDescription: event.title, // Thông tin đơn hàng
    //     orderType: 'payment', // Loại đơn hàng
    //     language: 'vn', // Ngôn ngữ
  };

  return (
    <>
      <p>Checkout for {event.title}</p>
      <Button onClick={handleCheckout}>Proceed to Payment</Button>
    </>
  );
}

export default Checkout;
