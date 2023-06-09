import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from '../utils/mutations';
import PaymentForm from '../components/PaymentForm';

const PaymentPage = () => {
  const { eventId } = useParams();

  // Query event data
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

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Price: {event.price}</p>
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
