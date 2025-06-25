// /src/features/events/CreateEvent.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function CreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    event_date: '',
    price: '',
    places: '',
    image: null,
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const uploadRes = await api.post('/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Event created successfully!');
      navigate('/admin/events');
    } catch (err) {
      console.error(err);
      setMessage('Failed to create event.');
    }
  };

  return (
    <div className="event-create-form">
      <h2>Create New Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input name="event_date" type="date" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price (€)" onChange={handleChange} required />
        <input name="places" type="number" placeholder="Available places" onChange={handleChange} required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
