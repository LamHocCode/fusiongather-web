"use server"

export const createPaymentUrl = async (amount: number, orderDescription: string, orderType: string, language: string) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/payment/create_payment_url`, {
        method: "POST",
        body: JSON.stringify({ 
          amount,
          orderDescription,
          orderType,
          language,
          // Các thông tin khác cần thiết
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.error(`Request failed with status: ${res.status}`);
        return await res.json();
      }
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };