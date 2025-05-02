import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../../redux/orderSlice';
import { clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      id: Date.now(),
      ...form,
      items: cartItems,
      total,
    };

    dispatch(placeOrder(orderData));
    dispatch(clearCart());
    navigate('/success');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          required
          className="w-full border p-2 rounded"
        />
        <p className="text-right font-semibold">Total: €{total.toFixed(2)}</p>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
