import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_EVENTS } from '../utils/mutations';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data || !data.events) {
    console.error('Error:', error);
    return <div>Something went wrong. Unable to fetch event details.</div>;
  }

  const event = data.events.find(event => event._id === eventId);

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="eventDetails">
      <h2 id="eventTitle">{event.title}</h2>
      <h2 id="eventModel">{event.models}</h2>
      <p id="eventStartTime">Start Time: {event.startTime}</p>
      <p id="eventDescription">{event.description}</p>
    </div>
  );
};

export default EventDetails;
