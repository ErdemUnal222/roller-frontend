import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axios";
import Comments from '../comments/Comments'; // adjust path if needed


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data.result);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
const checkRegistration = async () => {
  try {
    const response = await api.get(`/events/${id}/is-registered`);
    setIsRegistered(response.data.registered); // Assume backend returns { registered: true/false }
  } catch (error) {
    console.error('Error checking registration:', error);
  }
};
checkRegistration(); 
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const formData = new FormData();

      // If a file is selected, append it
      if (selectedFile) {
        formData.append('picture', selectedFile);
      }

      const response = await api.post(`/events/${id}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('✅ Successfully registered for the event!');
    } catch (error) {
      console.error('❌ Registration failed:', error);
      setMessage('❌ Failed to register. Please try again or log in.');
    }
  };
  const handleUnregister = async () => {
  try {
    await api.delete(`/events/${id}/unregister`);
    setMessage('✅ You have been unregistered from the event.');
    setIsRegistered(false);
  } catch (error) {
    console.error('❌ Unregistration failed:', error);
    setMessage('❌ Could not unregister. Please try again.');
  }
};


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="mb-2">{event.description}</p>
      <p className="text-gray-600">📅 Date: {new Date(event.event_date).toLocaleDateString()}</p>
      <p className="text-gray-600">🎟️ Places: {event.places}</p>
      <p className="text-gray-600">💶 Price: {event.price} €</p>

      {/* File upload field */}
      <div className="mt-4">
        <label className="block mb-2 font-semibold">Upload a photo (optional):</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </div>

      {isRegistered ? (
  <button
    onClick={handleUnregister}
    className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Unregister from this Event
  </button>
) : (
  <button
    onClick={handleRegister}
    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Register for this Event
  </button>
)}
{/* Comments should go here, outside the button */}
<Comments eventId={id} />


      {message && <p className="mt-4 text-center text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default EventDetails;
