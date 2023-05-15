import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENTS, DELETE_EVENT, UPDATE_EVENT } from '../utils/mutations.js';
import './EventCalendar.css';
import Auth from '../utils/auth.js';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const [events, setEvents] = useState([]);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const profile = Auth.getProfile();
  const isAdmin = profile && profile.isAdmin;

  useEffect(() => {
    if (data) {
      const formattedEvents = data.events.map(event => ({
        ...event,
        start: new Date(event.startTime),
        end: new Date(event.startTime),
      }));
      setEvents(formattedEvents);
    }
  }, [data]);

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`Are you sure you want to delete the event "${event.title}" on ${event.startTime}?`)) {
      await deleteEvent({ variables: { _id: event._id } });
      // Refresh events
    }
  };

  const handleUpdateEvent = async (event) => {
    const title = window.prompt('Update title:', event.title);
    const models = window.prompt('Update models:', event.models);
    const startTime = window.prompt('Update start time:', event.startTime);

    if (title && models && startTime) {
      await updateEvent({ variables: { _id: event._id, title, models, startTime } });
      // Refresh events
    }
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm');
  };

  const titleAccessor = event => `
    ${event.title} - ${event.models || 'No models'} - ${moment(event.start).format('hh:mm A')} - ${moment.tz(event.start, 'America/Los_Angeles').format('z')}
  `;

  const eventWrapper = ({ event, children }) => {
    return (
      <div>
        {children}
        {isAdmin && (
          <div>
            <button className="delete-event" onClick={() => handleDeleteEvent(event)}>X</button>
            <button className="update-event" onClick={() => handleUpdateEvent(event)}>+</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        components={{ eventWrapper }}
        titleAccessor={titleAccessor}
        onSelectEvent={event => window.location.href = `/event/${event._id}`}
      />
    </div>
  );
};

export default EventCalendar;
