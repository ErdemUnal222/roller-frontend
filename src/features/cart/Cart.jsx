// /src/pages/Cart.jsx

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  incrementItem,
  decrementItem,
  removeItem,
} from '../../redux/cartSlice';
import "/src/styles/main.scss";

/**
 * Cart Component
 * Displays the current user's shopping cart with item controls and checkout link.
 */
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total cart value
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Display message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2 className="cart-title">Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products" className="cart-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container" role="main" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart-title">Your Cart</h2>

      {/* Render each cart item */}
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-info">
            {item.image && (
              <img
                src={`/uploads/${item.image}`}
                alt={item.title || 'Product image'}
                className="cart-item-image"
              />
            )}
            <div>
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">€{item.price}</p>
            </div>
          </div>

          {/* Quantity control buttons */}
          <div className="cart-controls">
            <button
              className="cart-button"
              onClick={() => dispatch(decrementItem(item.id))}
              aria-label={`Decrease quantity of ${item.title}`}
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              className="cart-button"
onClick={() => dispatch(incrementItem({ id: item.id, stock: item.stock }))}
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>

            {/* Remove item from cart */}
            <button
              className="cart-remove"
              onClick={() => dispatch(removeItem(item.id))}
              aria-label={`Remove ${item.title} from cart`}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Display total and proceed to checkout */}
      <div className="cart-summary">
        <p className="cart-total">Total: €{total.toFixed(2)}</p>
        <Link to="/checkout" className="cart-checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
