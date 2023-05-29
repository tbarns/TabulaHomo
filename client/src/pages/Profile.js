import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_EVENT, GET_USER, CREATE_ARTIST } from '../utils/mutations';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Logout from '../components/Logout';
import './Profile.css';
import Alert from 'react-bootstrap/Alert';
import EventCalendar from '../components/EventCalendar';
import UploadForm from '../components/UploadForm';
import ImageUploadForm from '../components/ImageUploadForm';

const EventForm = ({ onSubmit, formAlert, setFormAlert, showAlert, setShowAlert }) => {
  const [title, setTitle] = useState('');
  const [models, setModels] = useState('');
  const [theme, setTheme] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeZone, setTimeZone] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [createEvent, { error: eventError }] = useMutation(CREATE_EVENT);
  const handleStartDateChange = (date) => {
    setStartTime(date);
  };

  const handleEndDateChange = (date) => {
    setEndTime(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Auth.getToken();
    const event = {
      title,
      models,
      theme,
      startTime: startTime.toISOString(),
      timeZone,
      description,
      price,
    };
    console.log(event);

    try {
      const { data } = await createEvent({
        variables: event,
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      console.log('Event created successfully', data);
      onSubmit(event);
      setFormAlert('Event created successfully');
      setShowAlert(true);
      // Clear the input fields
      setTitle('');
      setModels('');
      setTheme('');
      setStartTime(null);
      setEndTime(null);
      setTimeZone('');
      setDescription('');
      setPrice('');
      setFormAlert('Event created successfully');
      setShowAlert(true);
    } catch (err) {
      console.error('Failed to create event', err);
      setFormAlert(`Failed to create event: ${err.message}`);
      setShowAlert(true);
    }
  };

  return (
    <div>
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
          <label htmlFor="price">Price:</label>
          <textarea
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

const handleArtistSubmit = async (artist, createArtist) => {
  const { name, twitter, instagram, facebook, website, profilePhoto, workImages, bio, location } = artist;
  const artistInput = {
    name,
    twitter,
    instagram,
    facebook,
    website,
    profilePhoto,
    workImages,
    bio,
    location,
  };

  try {
    const { data } = await createArtist({
      variables: { artistInput },
    });

    // Handle the response
    console.log(data);
  } catch (error) {
    console.error('Failed to create artist:', error);
  }

  console.log(artist);
};

const Profile = () => {
  const [formAlert, setFormAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const { loading, data } = useQuery(GET_USER);
  const [createArtist, { error: artistError }] = useMutation(CREATE_ARTIST);
  const [createEvent, { error: eventError }] = useMutation(CREATE_EVENT);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.getUser;
  const userEmail = user?.email;

  const handleEventSubmit = (event) => {
    console.log(event);
    // Here you could add more logic to handle the event data if needed
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <div>
          <h2>Create Event</h2>
      
          {showAlert && (
            <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
              {formAlert}
            </Alert>
          )}
          <div className="temp">
            <Logout />
            <button onClick={() => setShowCalendar(!showCalendar)}>
              Toggle Calendar
            </button>
            {showCalendar && <EventCalendar />}
            <UploadForm
              onSubmit={handleArtistSubmit}
              formAlert={formAlert}
              setFormAlert={setFormAlert}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
            <EventForm
              onSubmit={handleEventSubmit}
              formAlert={formAlert}
              setFormAlert={setFormAlert}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              userEmail={userEmail}
            />
          </div>
        </div>
      ) : (
        <p>
          You need to be logged in. Please <Link to="/">login</Link>.
        </p>
      )}
    </>
  );
};

export default Profile;
