import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/mutations.js';
import './EventCalendar.css'

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const [events, setEvents] = useState([]);

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

  const eventClickHandler = event => {
    window.location.href = `/event/${event._id}`;
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        titleAccessor={event => `${event.title} - ${event.models || 'No models'} - ${moment(event.startTime).format('hh:mm A')} - ${moment.tz(event.startTime, 'America/Los_Angeles').format('z')}`}

        onSelectEvent={eventClickHandler}
      />

    </div>
  );
};

export default EventCalendar;
