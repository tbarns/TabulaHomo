import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_EVENTS, GET_USER } from '../utils/mutations';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const { loading: eventsLoading, error: eventsError, data: eventData } = useQuery(QUERY_EVENTS);
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  if (eventsLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (eventsError || !eventData || !eventData.events) {
    console.error('Error:', eventsError);
    return <div>Something went wrong. Unable to fetch event details.</div>;
  }

  const event = eventData.events.find(event => event._id === eventId);

  if (!event) {
    return <div>Event not found.</div>;
  }

  const user = userData?.user;
  const userEmail = user?.email;

  return (
    <div>
      <div className="eventDetails">
        <h2 id="eventTitle">{event.title}</h2>
        <h2 id="eventModel">{event.models}</h2>
        <p id="eventStartTime">Start Time: {event.startTime}</p>
        <p id="eventDescription">{event.description}</p>
      </div>
      <div className="venmo-button">
        <a
          href={`https://venmo.com/u/timothy-barnaby?event=${encodeURIComponent(event.title)}&email=${encodeURIComponent(userEmail)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="button">Pay with Venmo</button>
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
