// /src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/userSlice';
import api from '../../api/axios';
import "/src/styles/main.scss";

/**
 * Login page component
 * Handles user authentication and redirects based on role
 */
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Login response missing token or user.");
      }

      // Store user with token in localStorage
      const userDataToStore = { ...user, token };
      localStorage.setItem('user', JSON.stringify(userDataToStore));
      localStorage.setItem('userId', user.id); // optional

      console.log("✅ User logged in, stored in localStorage:", userDataToStore);

      // Update Redux store
     dispatch(setToken(token));
dispatch(setUser(userDataToStore)); // ✅ includes token


      // Redirect based on role
      const redirectTo = from || (user.role === 'admin' ? '/dashboard' : '/profile');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err?.formattedMessage || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page" role="main" aria-labelledby="login-title">
      <form
        onSubmit={handleSubmit}
        className="login-form"
        role="form"
        aria-describedby="login-instructions"
      >
        <h1 id="login-title" className="login-title">Login</h1>
        <p id="login-instructions" className="login-instructions">
          Please enter your email and password to access your account.
        </p>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            aria-required="true"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            aria-required="true"
            required
          />
        </div>

        {error && (
          <p className="form-error" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="form-button form-button-green"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}

export default Login;
