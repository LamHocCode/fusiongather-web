// components/PaymentForm.tsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EventType } from '@/lib/type';

interface PaymentForm {
    event: EventType;
  }
const PaymentForm = ({ event }: PaymentForm) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);
      // Tiếp tục xử lý thanh toán tại đây với stripe
    } catch (error) {
      console.error('Error during payment:', error);
      setIsProcessing(false);
      setPaymentStatus('failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      {/* Form fields và nút thanh toán */}
      {isProcessing && <div>Processing...</div>}
      {paymentStatus && <div>Payment status: {paymentStatus}</div>}
    </form>
  );
};

export default PaymentForm;
