// /src/pages/Success.jsx

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/styles/main.scss";

/**
 * Success Component
 * Displays confirmation and order details after a successful checkout.
 * Redirects to homepage if no order data is available.
 */
function Success() {
  const order = useSelector((state) => state.order.latestOrder); // Get latest order from Redux store
  const navigate = useNavigate();

  // If no order data is present (e.g., page was refreshed), redirect to home
  useEffect(() => {
    if (!order) {
      navigate('/', { replace: true });
    }
  }, [order, navigate]);

  // If redirected before order exists, render nothing
  if (!order) return null;

  return (
    <div className="success-container" role="main" aria-labelledby="success-title">
      <h2 id="success-title" className="success-title">Order Confirmed</h2>

      <p className="success-message">
        Thank you, <strong>{order.name}</strong>! Your order has been placed successfully.
      </p>

      {/* Shipping Details */}
      <div className="shipping-info">
        <h3 className="info-heading">Shipping Info:</h3>
        <p>{order.name}</p>
        <p>{order.email}</p>
        <p>{order.address}</p>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h3 className="info-heading">Order Summary:</h3>
        <ul className="summary-list">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.title} × {item.quantity} — €{item.price.toFixed(2)} each ={" "}
              <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <p className="success-total">Total Paid: €{order.total.toFixed(2)}</p>
    </div>
  );
}

export default Success;
