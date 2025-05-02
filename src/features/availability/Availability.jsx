import { useEffect, useState } from 'react';
import {
  getAllAvailabilities,
  createAvailability
} from '../../api/availabilityService';

function Availability() {
  const [availabilities, setAvailabilities] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: '', isAvailable: true });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createAvailability(newSlot);
      setAvailabilities([...availabilities, created]);
      setNewSlot({ date: '', isAvailable: true });
    } catch (err) {
      console.error('Error creating availability:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Availability</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="date"
          value={newSlot.date}
          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Availability
        </button>
      </form>

      <ul className="space-y-2">
        {availabilities.map((slot) => (
          <li key={slot.id} className="border p-3 rounded">
            {slot.date} — {slot.isAvailable ? 'Available' : 'Unavailable'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Availability;
