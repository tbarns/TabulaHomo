import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT_PAYMENT } from '../utils/mutations';

const PayPalPayment = ({ eventData, amount }) => {
  const [createPayPalPayment, { data }] = useMutation(CREATE_EVENT_PAYMENT);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AdGrq2bDEGNkmt-ixEh3y12FfeZqsmyljtvy9J6iWbz4f55vODNn5Hr8TPXNZAakqV-o1Z1qUvjKbBm1';
    script.async = true;
    script.onload = initializePayPalButton;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializePayPalButton = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          // Order creation logic
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: eventData.price.currency_code,
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // Order approval logic
          try {
            const response = await createPayPalPayment({
              variables: {
                eventId: eventData._id,
                amount,
                currency: eventData.price.currency_code,
                orderId: data.orderID,
              },
            });
            // Handle the successful payment response
            console.log(response.data);
          } catch (error) {
            // Handle the error case
            console.error('Failed to create PayPal payment:', error);
          }
        },
      })
      .render('#paypal-button-container');
  };

  return <div id="paypal-button-container"></div>;
};

export default PayPalPayment;
