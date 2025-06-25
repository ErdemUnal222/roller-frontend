import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/main.scss';

function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(Array.isArray(res.data.result) ? res.data.result : []);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle event deletion
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this event?');
    if (!confirm) return;

    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="admin-events-container">
      <h2 className="admin-title">Manage Events</h2>

      <div className="admin-toolbar">
        <Link to="/events/create" className="btn-primary">
          Add New Event
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading events...</div>
      ) : (
        <ul className="admin-list">
          {events.map((event) => (
            <li key={event.id} className="admin-item">
              <div>
                <p className="admin-item-title">{event.title}</p>
                <p className="admin-item-date">{event.date}</p>
              </div>
              <div className="admin-actions">
                <Link to={`/events/edit/${event.id}`} className="btn-link">Edit</Link>
                <button onClick={() => handleDelete(event.id)} className="btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsAdmin;
