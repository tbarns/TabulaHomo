import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../utils/mutations';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Logout from '../components/Logout';
import './Profile.css';
import './Event.css'

const EventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [models, setModels] = useState('');
  const [theme, setTheme] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeZone, setTimeZone] = useState('');
  const [description, setDescription] = useState('');
  // const [images, setImages] = useState([]);

  const handleStartDateChange = (date) => {
    setStartTime(date);
  };
  const [createEvent, { error }] = useMutation(CREATE_EVENT);
  const handleEndDateChange = (date) => {
    setEndTime(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare event object with form data
    const event = {
      title,
      models,
      theme,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeZone,
      description,
    };
    // Call the createEvent mutation
    try {
      const { data } = await createEvent({
        variables: event,
      });
      console.log('Event created successfully', data);
      // Pass the event object to the onSubmit handler
      onSubmit(event);
    } catch (err) {
      console.error('Failed to create event', err);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="models">Models:</label>
          <input
            type="text"
            id="models"
            value={models}
            onChange={(e) => setModels(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme:</label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <DatePicker
            id="startTime"
            selected={startTime}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select start time"
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <DatePicker
            id="endTime"
            selected={endTime}
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select end time"
          />
        </div>
        <div>
          <label htmlFor="timeZone">Time Zone:</label>
          <input
            type="text"
            id="timeZone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>

        </div>
        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};


const Profile = () => {

  const handleEventSubmit = (event) => {
    console.log(event);
    // Here you could add more logic to handle the event data if needed
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="temp">
          <Logout />
          <EventForm onSubmit={handleEventSubmit} />
          {/* ... rest of the code here */}
        </div>
      ) : (
        <p>
          You need to be logged in to view exercises. Please{' '}
          <Link to="/">login</Link>.
        </p>
      )}
    </>
  );
};

export default Profile;