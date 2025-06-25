// /src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from './redux/userSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Unauthorized from './features/auth/Unauthorized';

import PublicEventList from './features/events/PublicEventList';
import EventDetails from './features/events/EventDetails';
import CreateEvent from './features/events/CreateEvent';

import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Products from './features/products/Products';
import AddProduct from './features/products/AddProduct';
import EditProduct from './features/products/EditProduct';

import Dashboard from './features/auth/Dashboard';
import UsersAdmin from './features/admin/UsersAdmin';
import EventsAdmin from './features/admin/EventsAdmin';
import DeleteMessage from './features/admin/DeleteMessage';

import Profile from './features/profile/Profile';
import Availability from './features/availability/Availability';
import Comments from './features/comments/Comments';
import Orders from './features/orders/Orders';
import Cart from './features/cart/Cart';
import Checkout from './features/cart/Checkout';
import Success from './features/cart/Success';
import MessageInbox from './features/messages/MessageInbox';
import MessagesPage from './features/messages/MessagesPage';

function App() {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token && parsed?.id) {
          dispatch(setToken(parsed.token));
          dispatch(setUser(parsed));
        }
      } catch (err) {
        console.warn("❌ Failed to parse stored user:", err);
      }
    }
    setAuthReady(true);
  }, [dispatch]);

  if (!authReady) return <div className="p-4 text-center">⏳ Checking session...</div>;

  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Private */}
            <Route element={<PrivateRoute />}>
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/events" element={<PublicEventList />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<MessageInbox />} />
              <Route path="/messages/:userId1/:userId2" element={<MessagesPage />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UsersAdmin />} />
              <Route path="/admin/events" element={<EventsAdmin />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/events/create" element={<CreateEvent />} />
              <Route path="/admin/messages" element={<DeleteMessage />} /> {/* ✅ Route added */}
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
