// /src/components/events/EventDetails.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios';
import Comments from '../comments/Comments';
import "/src/styles/main.scss";

/**
 * EventDetails Component
 * Displays detailed information about a specific event, allows registration/unregistration,
 * and supports image upload by admins.
 */
const EventDetails = () => {
  const { id } = useParams(); // Event ID from URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const role = useSelector((state) => state.user.role);

  // Fetch registration status
  const checkRegistration = async () => {
    try {
      const res = await api.get(`/events/${id}/is-registered`);
      setIsRegistered(res.data.registered);
    } catch (err) {
      console.error('Registration check failed:', err);
      setIsRegistered(false);
    }
  };

  // Fetch event details
  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.result);
    } catch (err) {
      console.error('Error fetching event:', err);
    }
  };

  useEffect(() => {
    fetchEvent();
    checkRegistration();
  }, [id]);

  // Register user for event
  const handleRegister = async () => {
    try {
      await api.post(`/events/${id}/register`);
      await checkRegistration();
      setMessage('Successfully registered for the event.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
    }
  };

  // Unregister user from event
  const handleUnregister = async () => {
    try {
      await api.delete(`/events/${id}/unregister`);
      await checkRegistration();
      setMessage('You have been unregistered from the event.');
    } catch (err) {
      setMessage('Could not unregister from the event.');
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload or update event picture (admin only)
  const handleUploadPicture = async () => {
    if (!selectedFile) return;

    if (role !== 'admin') {
      setMessage('Only admins can upload event pictures.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const uploadRes = await api.post('/events/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await api.put(`/events/${id}`, {
        ...event,
        picture: uploadRes.data.filename,
      });

      const updated = await api.get(`/events/${id}`);
      setEvent(updated.data.result);
      setSelectedFile(null);
      setMessage('Picture updated successfully.');
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Failed to upload or update picture.');
    }
  };

  if (!event) return <div className="event-loading">Loading event...</div>;

  return (
    <div className="event-details">
      <h1 className="event-title">{event.title}</h1>

      {event.picture && (
        <img
          src={`http://ihsanerdemunal.ide.3wa.io:9500/uploads/${event.picture}`}
          alt={event.alt || event.title}
          className="event-image"
        />
      )}

      <p className="event-description">{event.description}</p>
      <p className="event-meta">Date: {new Date(event.event_date).toLocaleDateString()}</p>
      <p className="event-meta">Available Places: {event.places}</p>
      <p className="event-meta">Price: €{event.price}</p>

      {/* Admin image upload panel */}
      {role === 'admin' && (
        <div className="event-upload">
          <label htmlFor="event-image-upload">Upload or Change Event Image</label>
          <input
            id="event-image-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={handleUploadPicture}>Upload Image</button>
        </div>
      )}

      {/* Registration buttons */}
      {isRegistered ? (
        <button className="event-button unregister" onClick={handleUnregister}>
          Unregister
        </button>
      ) : (
        <button className="event-button register" onClick={handleRegister}>
          Register
        </button>
      )}

      {/* Message output */}
      {message && <p className="event-message">{message}</p>}

      {/* Comments Section */}
      <Comments eventId={id} />
    </div>
  );
};

export default EventDetails;
