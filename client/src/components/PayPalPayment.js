import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PAYPAL_PAYMENT } from '../utils/mutations'; // Import your GraphQL mutation

const PayPalPayment = ({ eventData, currency }) => {
  const [createPayPalPayment, { data }] = useMutation(CREATE_PAYPAL_PAYMENT);

  const handlePayment = async () => {
    try {
      const { data } = await createPayPalPayment({
        variables: {
           eventId: eventData._id,
          amount: eventData.price,
          currency: 'USD',
        },
      });
      const { orderId, approveUrl } = data.createPayPalPayment;

      // Redirect the user to the PayPal approval URL
      window.location.href = approveUrl;
    } catch (error) {
      console.error('Failed to create PayPal payment:', error);
      // Handle error case
    }
  };

  return (
    <div>
      {/* Render your payment form or button */}
      <button onClick={handlePayment}>Pay with PayPal</button>
    </div>
  );
};

export default PayPalPayment;
