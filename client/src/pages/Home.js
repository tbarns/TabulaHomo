import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/mutations';
import EventCalendar from '../components/EventCalendar';
import Login from './Login';
import './Home.css'

export default function Home() {
  // Fetch events data using useQuery
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  if (loading) {
    // Handle loading state if needed
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state if needed
    return <div>Error occurred: {error.message}</div>;
  }

  const events = data.events;

  return (
    <>
      <div className="container" id="homeDiv">

      </div>
      <div>
        <EventCalendar events={events} />
      </div>
    </>
  );
}
