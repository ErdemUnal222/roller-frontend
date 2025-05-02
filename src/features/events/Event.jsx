import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../api/axios";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        console.log('API response:', response.data);
        setEvents(response.data.result); // Assuming result is the array
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Events</h1>

      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="mb-2">
            <h2 className="text-xl">{event.title}</h2>
            <p>Date: {event.event_date}</p>
            {/* Updated link */}
            <Link to={`/events/${event.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default Event;
