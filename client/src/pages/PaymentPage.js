import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from '../utils/mutations';
import PayPalPayment from '../components/PayPalPayment';

const PaymentPage = () => {
  const { eventId } = useParams();

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error:', error);
    return <div>Something went wrong. Unable to fetch event details.</div>;
  }

  const event = data.event;

  // Remove non-numeric characters from the event price string
  const priceValue = event.price.replace(/[^0-9.]/g, '');

  // Convert the priceValue string into a valid number
  const amountValue = parseFloat(priceValue);

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Price: {event.price}</p>
      {/* Render the PayPalPayment component with the updated event object and amount value */}
      <PayPalPayment eventData={event} amount={amountValue} />
    </div>
  );
};

export default PaymentPage;
