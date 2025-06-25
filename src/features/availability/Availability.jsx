// /src/pages/Availability.jsx

import { useEffect, useState } from 'react';
import {
  getAllAvailabilities,
  createAvailability,
} from '../../api/availabilityService';
import "/src/styles/main.scss";

/**
 * Availability Component
 * Allows users to view and manage their availability slots.
 */
function Availability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: '', isAvailable: true });

  // Fetch all availabilities on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllAvailabilities();
        setAvailabilities(data);
      } catch (error) {
        console.error('Error loading availabilities', error);
      }
    }
    fetchData();
  }, []);

  // Handle new availability submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createAvailability(newSlot);
      setAvailabilities([...availabilities, created]); // Add new slot to UI
      setNewSlot({ date: '', isAvailable: true });     // Reset form
    } catch (err) {
      console.error('Error creating availability:', err);
    }
  };

  return (
    <div className="availability-page" role="main" aria-labelledby="availability-title">
      <h2 id="availability-title" className="availability-title">My Availability</h2>

      {/* Availability Form */}
      <form onSubmit={handleSubmit} className="availability-form">
        <input
          type="date"
          value={newSlot.date}
          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
          className="availability-input"
          required
          aria-label="Select availability date"
        />
        <button type="submit" className="availability-button">
          Add Availability
        </button>
      </form>

      {/* List of availabilities */}
      <ul className="availability-list">
        {availabilities.map((slot) => (
          <li key={slot.id} className="availability-item">
            {slot.date} — {slot.isAvailable ? 'Available' : 'Unavailable'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Availability;
