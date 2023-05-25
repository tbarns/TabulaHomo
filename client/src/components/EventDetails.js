import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_EVENTS, GET_USER } from '../utils/mutations';
import './EventDetails.css';
import moment from 'moment';


const EventDetails = () => {
  const { eventId } = useParams();

  // Query event data
  const { loading: eventsLoading, error: eventsError, data: eventData } = useQuery(QUERY_EVENTS);

  // Query user data
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  // State for email input
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const handleGetTicket = () => {
    const paymentDiv = document.getElementById('paymentDiv');
    paymentDiv.scrollIntoView({ behavior: 'smooth' });
  };

  if (eventsLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (eventsError || !eventData || !eventData.events) {
    console.error('Error:', eventsError);
    return <div>Something went wrong. Unable to fetch event details.</div>;
  }

  // Find the event by eventId
  const event = eventData.events.find(event => event._id === eventId);

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

  return (
    <div id = "eventContainter">
      <div className="eventDetails">
      <div className="getTicketButton" onClick={handleGetTicket}>
          Get Your Ticket
        </div>
        <p id="eventTitle">{event.title}</p>
        <h2 id="eventModel">{event.models}</h2>
        <h4 id="eventPrice">{event.price}</h4>
        <p id="eventStartTime">Start Time: {moment(event.startTime).format('MMM DD, HH:mm')}{event.timeZone}</p>
        <p id="eventDescription">{event.description}</p>
      </div>
      <div id='paymentDiv' >
      <div className="venmo-button">
        {/* Email input */}
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        {/* Venmo payment button */}
        <div className={`button ${isEmailValid ? "" : "disabled"}`} onClick={handleVenmoPayment}>
          Pay with Venmo
        </div>
        {!isEmailValid && (
          <div className="signup-text">
            <p>Enter your email then click Pay to sign up.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default EventDetails;
