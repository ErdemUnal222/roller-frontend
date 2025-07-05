import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import '/src/styles/main.scss';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const auth = useSelector((state) => state.user); // assumes you store user info in auth state

  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = auth?.user?.id;

      if (!userId || !token) {
        alert("You must be logged in to complete the order.");
        return;
      }

      const response = await fetch('http://localhost:9500/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          totalAmount: total,
          items: cartItems.map((item) => ({
            name: item.title,
            price: item.price,
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json();

      if (data.url) {
        // clear cart and redirect to Stripe
        dispatch(clearCart());
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout. Please try again.");
    }
  };

  return (
    <div className="checkout-container" role="main" aria-labelledby="checkout-title">
      <h1 id="checkout-title" className="checkout-title">Checkout</h1>

      {/* Order Summary */}
      <section className="order-summary">
        <h2 className="summary-heading">Order Summary</h2>
        <ul className="summary-items">
          {cartItems.map((item) => (
            <li key={item.id} className="summary-item">
              <div className="item-info">
                <p className="item-title">{item.title}</p>
                <span className="item-quantity">
                  {item.quantity} × €{item.price.toFixed(2)}
                </span>
              </div>
              <div className="item-total">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
        <div className="summary-total">
          <strong>Total:</strong> €{total.toFixed(2)}
        </div>
      </section>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="checkout-input"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="checkout-input"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          required
          className="checkout-input"
          rows="4"
        />
        <button type="submit" className="checkout-button">
          Confirm and Pay
        </button>
      </form>
    </div>
  );
}

export default Checkout;
