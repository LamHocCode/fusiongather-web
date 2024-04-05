import React, { useState } from 'react';

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
    // amount: 100, // Thay 100 bằng số tiền cần thanh toán
    //     orderDescription: event.title, // Thông tin đơn hàng
    //     orderType: 'payment', // Loại đơn hàng
    //     language: 'vn', // Ngôn ngữ
  };

  return (
    <>
      <p className='w-1/2'>Checkout</p>
      <Button className='w-1/2' onClick={handleCheckout}>Proceed to Payment</Button>
    </>
  );
}

export default Checkout;
