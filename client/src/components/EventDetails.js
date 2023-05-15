import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_EVENT } from '../utils/mutations';

const EventDetails = () => {
    const { eventId } = useParams();
    const { loading, error, data } = useQuery(GET_EVENT, {
      variables: { eventId },
    });

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error || !data || !data.event) {
      console.error('Error:', error);
      return <div>Something went wrong. Unable to fetch event details.</div>;
    }
  
    const { event } = data;
  
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
