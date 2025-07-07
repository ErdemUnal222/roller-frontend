// /src/pages/Availability.jsx

import { useEffect, useState } from 'react';
import {
  getAllAvailabilities,
  createAvailability,
} from '../../api/availabilityService'; // Import API service functions
import "/src/styles/main.scss"; // Global styles import

/**
 * Availability Component
 *
 * This page allows users to view a list of their availability dates
 * and add new availability slots using a simple form.
 */
function Availability() {
  // State to hold the list of current availability slots
  const [availabilities, setAvailabilities] = useState([]);

  // State to hold form input values for a new availability
  const [newSlot, setNewSlot] = useState({ date: '', isAvailable: true });

  /**
   * useEffect runs once on component mount.
   * It fetches all existing availability slots from the backend API.
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllAvailabilities(); // API call to get all availability records
        setAvailabilities(data); // Store data in state
      } catch (error) {
        console.error('Error loading availabilities', error); // Log error if fetch fails
      }
    }

    fetchData();
  }, []); // Empty dependency array → runs only on first render

  /**
   * Handles form submission to create a new availability slot.
   * Calls the backend API and updates the UI with the new slot.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    try {
      const created = await createAvailability(newSlot); // API call to add new slot
      setAvailabilities([...availabilities, created]); // Update state with the new slot
      setNewSlot({ date: '', isAvailable: true }); // Reset form inputs
    } catch (err) {
      console.error('Error creating availability:', err); // Log any errors
    }
  };

  return (
    <div className="availability-page" role="main" aria-labelledby="availability-title">
      <h2 id="availability-title" className="availability-title">My Availability</h2>

      {/* Form to add a new availability slot */}
      <form onSubmit={handleSubmit} className="availability-form">
        <input
          type="date"
          value={newSlot.date}
          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })} // Update date input
          className="availability-input"
          required
          aria-label="Select availability date"
        />
        <button type="submit" className="availability-button">
          Add Availability
        </button>
      </form>

      {/* Render list of all existing availability entries */}
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
