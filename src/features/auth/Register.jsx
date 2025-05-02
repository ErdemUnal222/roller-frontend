import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        address,
        zip,
        city,
      });

      console.log('✅ Registration success:', response.data);
      navigate('/login'); // Redirect after successful registration
    } catch (err) {
  console.error('❌ Registration failed:', err);
  if (err.response) {
    setError(
      (err.response && err.response.data && err.response.data.msg) ||
      'Registration failed.'
    );
  } else if (err.request) {
    setError('No response from server.');
  } else {
    setError('Unexpected error occurred.');
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full border p-2 rounded mb-3" required />

        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full border p-2 rounded mb-3" required />

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded mb-3" required />

        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded mb-3" required />

        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="w-full border p-2 rounded mb-3" required />

        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Zip Code" className="w-full border p-2 rounded mb-3" required />

        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="w-full border p-2 rounded mb-3" required />

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
