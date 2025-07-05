import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../redux/userSlice';
import '../styles/main.scss';

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isLoggedIn = !!token;
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Roller</Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Main">
          <div className="navbar-section left">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/events" className="navbar-link">Events</Link>
            <Link to="/shop" className="navbar-link">Products</Link>

            {isAdmin && (
              <div className="navbar-admin">
                <span className="admin-label">Admin Panel</span>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
<Link to="/products" className="navbar-link">Manage Products</Link>
                <Link to="/products/add" className="navbar-link">Add Product</Link>
                <Link to="/admin/events" className="navbar-link">Manage Events</Link>
                <Link to="/admin/messages" className="navbar-link">Delete Messages</Link>
              </div>
            )}
          </div>

          <div className="navbar-section right">
            <Link to="/cart" className="navbar-link cart">
              Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/messages" className="navbar-link">Messages</Link>
                <Link to="/profile" className="navbar-link profile-link">
                  {user?.picture ? (
                    <img
                      src={`http://ihsanerdemunal.ide.3wa.io:9500/uploads/${user.picture}?t=${Date.now()}`}
                      alt={`Avatar of ${user?.firstName || 'user'}`}
                      className="navbar-avatar"
                    />
                  ) : (
                    <span className="navbar-avatar-placeholder">
                      {user?.firstName?.[0] || 'U'}
                    </span>
                  )}
                  Profile
                </Link>
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="navbar-link">Register</Link>
                <Link to="/login" className="navbar-link">Login</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
