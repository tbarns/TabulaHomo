import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/mutations';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import "./SingleEvent.css"

const Events = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <h2>Events</h2>
    <BackButton />
    {data.events.map((event) => (
      <div key={event._id} onClick={() => handleEventClick(event._id)} className="eventCard">
        <h3>{event.title}</h3>
        <p>Start Time: {event.startTime}</p>
      </div>
    ))}
    {selectedEventId && (
      <Link to={`/event/${selectedEventId}`} className="toggleBtn">View Details</Link>
    )}
  </div>
);
};
export default Events;
