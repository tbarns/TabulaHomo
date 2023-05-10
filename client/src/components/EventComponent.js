import React, { useState, useEffect } from "react";
import Event from "../../server/models/Event";


const EventComponent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Query upcoming events
      const upcomingEventsResult = await Event.find({ startTime: { $gte: Date.now() } });
      setUpcomingEvents(upcomingEventsResult);

      // Query past events
      const pastEventsResult = await Event.find({ startTime: { $lt: Date.now() } });
      setPastEvents(pastEventsResult);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {upcomingEvents.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.startTime}</p>
          {/* display other event details */}
        </div>
      ))}

      <h2>Past Events</h2>
      {pastEvents.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.startTime}</p>
          {/* display other event details */}
        </div>
      ))}
    </div>
  );
};

export default EventComponent;
