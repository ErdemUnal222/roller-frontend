import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  incrementItem,
  decrementItem,
  removeItem,
} from '../../redux/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/productslist" className="text-blue-600 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">€{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-300 px-2 rounded"
              onClick={() => dispatch(decrementItem(item.id))}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="bg-gray-300 px-2 rounded"
              onClick={() => dispatch(incrementItem(item.id))}
            >
              +
            </button>
            <button
              className="text-red-500 ml-4"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-lg font-semibold">Total: €{total.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
