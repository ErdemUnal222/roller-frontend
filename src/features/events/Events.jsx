import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents, createEvent } from '../../api/eventService';

function Events() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    places: '',
    picture: '',
    alt: '',
    price: ''
  });

  // Fetch all events from API
  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      if (Array.isArray(data.result)) {
        setEvents(data.result);
      } else {
        console.error('Expected an array but got:', data.result);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      setFormData({
        title: '',
        description: '',
        event_date: '',
        places: '',
        picture: '',
        alt: '',
        price: ''
      });
      fetchEvents(); // Refresh event list
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="p-4">
      {/* Form to Create New Event */}
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="places"
          placeholder="Number of Places"
          value={formData.places}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="picture"
          placeholder="Picture URL"
          value={formData.picture}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="alt"
          placeholder="Alt text for image"
          value={formData.alt}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full">
          Create Event
        </button>
      </form>

      {/* Display Existing Events */}
      <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map(event => (
            <Link 
              to={`/events/${event.id}`} 
              key={event.id} 
              className="block border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-500 mb-1">{new Date(event.event_date).toLocaleDateString()}</p>
              <p className="text-gray-600">
  {event.description ? event.description.slice(0, 100) : ''}...
</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default Events;
