// /src/components/events/PublicEventList.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllEvents } from '../../api/eventService';
import '/src/styles/main.scss';

/**
 * PublicEventList Component
 * Displays a public-facing list of all available events.
 */
function PublicEventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        const normalized = Array.isArray(data) ? data : [data];
        setEvents(normalized);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
  <main className="public-events-page">
    <h1 className="public-events-title">Upcoming Events</h1>

    {loading && <p className="loading-msg">Loading events...</p>}
    {error && <p className="public-events-error">{error}</p>}

    <section className="public-event-list">
      {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <article key={event.id} className="public-event-card">
            <h2 className="event-name">{event.title}</h2>
            <time className="event-date">
              {new Date(event.event_date).toLocaleDateString()}
            </time>
            <p className="event-description">
              {event.description?.slice(0, 150)}...
            </p>
            <Link
              to={`/events/${event.id}`}
              className="event-link"
              aria-label={`View details about ${event.title}`}
            >
              View Details →
            </Link>
          </article>
        ))
      ) : (
        !loading && !error && (
          <p className="event-empty">No events available at this time.</p>
        )
      )}
    </section>
  </main>
);

}

export default PublicEventList;
