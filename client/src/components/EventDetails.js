import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_EVENTS, GET_USER, DELETE_EVENT } from '../utils/mutations';
import './EventDetails.css';
import moment from 'moment';
import EventGallery from './EventGallery';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const isLoggedIn = Auth.loggedIn();

  // Query event data
  const { loading: eventsLoading, error: eventsError, data: eventData } = useQuery(QUERY_EVENTS);

  // Query user data
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [timeRemaining, setTimeRemaining] = useState('');

  const handleGetTicket = () => {
    const paymentDiv = document.getElementById('paymentDiv');
    paymentDiv.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!eventData || !eventData.events) return;

    const event = eventData.events.find((event) => event._id === eventId);

    if (!event) return;

    const updateCountdown = () => {
      const startTime = moment(event.startTime);
      const currentTime = moment();

      if (currentTime.isAfter(startTime)) {
        // Event has started or passed
        setTimeRemaining('');
      } else {
        // Event is upcoming
        const duration = moment.duration(startTime.diff(currentTime));
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        setTimeRemaining(`${days} days ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [eventData, eventId]);

  if (eventsLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (eventsError || !eventData || !eventData.events) {
    console.error('Error:', eventsError);
    return <div>Something went wrong. Unable to fetch event details.</div>;
  }

  // Find the event by eventId
  const event = eventData.events.find((event) => event._id === eventId);

  if (!event) {
    return <div>Event not found.</div>;
  }

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent({ variables: { _id: eventId } });
      console.log('Event deleted successfully:', response);
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event');
    }
  };

  return (
    <div id="eventContainer">
      <div className="eventDetails">
        {timeRemaining ? (
          <div>
            <div id="topBanner">
              <div id="eventStartTime">
                <p>{moment(event.startTime).format('MMM DD, HH:mm')}  {event.timeZone}</p>
              </div>
              <div id="eventCountdown">
                <div>{timeRemaining}</div>
              </div>
            </div>
            <div className="getTicketButton" onClick={handleGetTicket}>
              🎟️Get Your Ticket🎟️
            </div>
            {isLoggedIn && (
              <button id="eventDeleteButton" onClick={handleDeleteEvent}>
                Delete Event
              </button>
            )}
          </div>
        ) : (
          <div id="eventPassed">
            <p>Event has passed</p>
          </div>
        )}
        <div>
          <p id="eventTitle">{event.title}</p>
          <p id='feat' >Featuring</p>
          <h2 id="eventModel">
            {event.models}</h2>
        </div>
        <p id="eventDescription">{event.description}</p>
      </div>
      <div id="eventGallery">
        <EventGallery eventId={eventId} isLoggedIn={isLoggedIn} />
      </div>
      {timeRemaining ? (
        <div id="paymentDiv">
          <p id="eventPrice">Price: {event.price} </p>

          <div id='paypalBtn' className='paymentBtn'>
            <Link
              to={{
                pathname: `/event/${eventId}/payment`,
                state: { event },
              }}
            >

              Pay With Paypal
            </Link>
          </div>
          <div className='paymentBtn'>
            <Link to="https://venmo.com/u/timothy-barnaby" target="_blank">
              Pay with Venmo
            </Link>
          </div>
          <div className='paymentBtn'
            id='preferedPayment'>
            <a href={
             `https://silhouetteandshadow.org/life_sessions/${event.ssId}`} target="_blank">
              Pay via Silhouette & Shadow
              </a>
          </div>



          <p className="emailPlease"> Please include your email in the payment comment section when paying with Venmo or Paypal </p>
        </div>
      ) : (
        <div id="eventPassedCard">
          <div>
            <p>Event has passed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
