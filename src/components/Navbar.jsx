import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logout } from '../redux/userSlice';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [isAdmin, setIsAdmin] = useState(role === 'admin');

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsLoggedIn(!!token);
    setIsAdmin(role === 'admin');
  }, [token, role]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow">
      {/* Left links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/productslist" className="hover:underline">Products</Link>

        {isAdmin && (
          <div className="flex flex-col gap-1 ml-4">
            <span className="font-semibold text-yellow-400">Admin:</span>
            <Link to="/products" className="hover:underline">Manage Products</Link>
            <Link to="/products/add" className="hover:underline">Add Product</Link>
            <Link to="/admin/events" className="hover:underline">Manage Events</Link>
          </div>
        )}
      </div>

      {/* Right links */}
      <div className="flex gap-4 items-center">
        {/* Cart */}
        <Link to="/cart" className="relative hover:underline">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="hover:underline text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
