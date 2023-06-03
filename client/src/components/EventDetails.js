import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_EVENTS, GET_USER, DELETE_EVENT } from '../utils/mutations';
import './EventDetails.css';
import moment from 'moment';
import EventGallery from './EventGallery';
import Auth from '../utils/auth';

const EventDetails = () => {
  const { eventId } = useParams();
  const isLoggedIn = Auth.loggedIn();
  console.log(isLoggedIn);
  // Query event data
  const { loading: eventsLoading, error: eventsError, data: eventData } = useQuery(QUERY_EVENTS);

  // Query user data
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  // State for email input
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
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
  
      const duration = moment.duration(startTime.diff(currentTime));
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
    
  
      setTimeRemaining(`${days} days
       ${hours}h  ${minutes}m  ${seconds}s `);
    };
  
    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1);
  
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

  // Handler for email input change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailValid(validateEmail(email));
  };

  // Basic email validation using regular expression
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Handler for Venmo payment button click
  const handleVenmoPayment = () => {
    if (!isEmailValid) {
      // Display error message or shake the button
      return;
    }

    // Construct the Venmo payment URL with email, event details, etc.
    const venmoURL = `https://venmo.com/u/timothy-barnaby?event=${encodeURIComponent(
      event.title
    )}&email=${encodeURIComponent(email)}`;

    // Open the Venmo payment URL in a new tab
    window.open(venmoURL, '_blank');
  };

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
    <div id="eventContainter">
      <div className="eventDetails">
        <div className="getTicketButton" onClick={handleGetTicket}>
        🎟️Get Your Ticket🎟️
        </div>
        {isLoggedIn && (
          <button id="deleteButton" onClick={handleDeleteEvent}>
            Delete Event
          </button>
        )}
        <div>
          <div id="topBanner">
            <div id="eventStartTime">
              <p>{moment(event.startTime).format('MMM DD, HH:mm')}{event.timeZone}
              </p>
            </div>
            <div id="eventCountdown">
              <div>{timeRemaining}</div>
            </div>
          </div>
          <p id="eventTitle">{event.title}</p>
          <h2 id="eventModel">{event.models}</h2>
        </div>
        <p id="eventDescription">{event.description}</p>
      </div>
      <div id="paymentDiv">
        <h4 id="eventPrice">{event.price}</h4>
        <div className="venmo-button">
          {/* Email input */}
          <input
            className="emailInput"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          {/* Venmo payment button */}
          <div className={`button ${isEmailValid ? '' : 'disabled'}`} onClick={handleVenmoPayment}>
            Pay with Venmo
          </div>
          {!isEmailValid && (
            <div className="signup-text">
              <p>Enter your email then click Pay to sign up.</p>
            </div>
          )}
        </div>
        <div id="eventGallery">
          <EventGallery eventId={eventId} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
