import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/mutations.js';

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
        endAccessor="end"
        titleAccessor="title"
        onSelectEvent={eventClickHandler}
      />
    </div>
  );
};

export default EventCalendar;
