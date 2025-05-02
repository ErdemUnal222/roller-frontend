import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setRole } from './redux/userSlice';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Public pages
import Home from './features/home/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Event from './features/events/Event';
import EventDetails from './features/events/EventDetails';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Unauthorized from './features/auth/Unauthorized';

// Private/User/Admin pages
import Dashboard from './features/auth/Dashboard';
import Profile from './features/profile/Profile';
import Availability from './features/availability/Availability';
import Comments from './features/comments/Comments';
import Orders from './features/orders/Orders';
import Events from './features/events/Events'; // Admin
import Products from './features/products/Products'; // Admin
import AddProduct from './features/products/AddProduct'; // Admin
import EditProduct from './features/products/EditProduct';
import Cart from './features/cart/Cart';
import Checkout from './features/cart/Checkout';
import Success from './features/cart/Success';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token) dispatch(setToken(token));
    if (user?.role) dispatch(setRole(user.role));
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Event />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/productslist" element={<ProductList />} />
        <Route path="/productslist/:id" element={<ProductDetail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/cart" element={<Cart />} />


        {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/admin/events" element={<Events />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
