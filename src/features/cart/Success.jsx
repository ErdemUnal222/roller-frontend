import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '/src/redux/orderSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/styles/main.scss';

/**
 * Checkout Component
 * Displays a checkout form for user to enter payment and billing info.
 * On submit, validates inputs and then redirects to success page.
 */
function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart items and user from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  // Controlled form state for credit card and billing info
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingName, setBillingName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  // For displaying validation errors
  const [error, setError] = useState('');

  // For disabling submit button during "payment processing"
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Basic client-side validation for form inputs
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    if (
      cardNumber.trim().length !== 16 ||
      !/^\d+$/.test(cardNumber) ||
      expiryDate.trim().length !== 5 || // format MM/YY
      !/^\d{2}\/\d{2}$/.test(expiryDate) ||
      cvc.trim().length < 3 ||
      !/^\d{3,4}$/.test(cvc) ||
      billingName.trim() === '' ||
      billingAddress.trim() === ''
    ) {
      setError('Please fill out all fields with valid information.');
      return false;
    }
    setError('');
    return true;
  };

  /**
   * Handles form submission
   * Validates the form, simulates payment, then dispatches order and redirects on success
   */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsProcessing(true);
  setError('');

  try {
    const orderPayload = {
      userId: user?.id,
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cartItems.map(({ id, title, price, quantity }) => ({
        productId: id,  // use productId so backend matches your DB schema
        name: title,
        price,
        quantity,
      })),
    };

    // Call backend to create order and get Stripe session URL
    const response = await api.post('/orders/checkout', orderPayload);

    // Redirect browser to Stripe checkout page
    window.location.href = response.data.url;

  } catch (err) {
    console.error('Order submission failed:', err);
    setError('Failed to process order. Please try again.');
    setIsProcessing(false);
  }
};


  return (
    <main className="checkout-container" role="main" aria-labelledby="checkout-title">
      <h1 id="checkout-title" className="checkout-title">Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form" noValidate>
        {/* Card Number */}
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          inputMode="numeric"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="1234123412341234"
          required
          aria-required="true"
          aria-describedby="cardNumberHelp"
        />
        <small id="cardNumberHelp">Enter 16 digit card number</small>

        {/* Expiry Date */}
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input
          id="expiryDate"
          name="expiryDate"
          type="text"
          maxLength={5}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          required
          aria-required="true"
          aria-describedby="expiryDateHelp"
        />
        <small id="expiryDateHelp">Format: MM/YY</small>

        {/* CVC */}
        <label htmlFor="cvc">CVC</label>
        <input
          id="cvc"
          name="cvc"
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={cvc}
          onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
          placeholder="123"
          required
          aria-required="true"
          aria-describedby="cvcHelp"
        />
        <small id="cvcHelp">3 or 4 digit security code</small>

        {/* Billing Name */}
        <label htmlFor="billingName">Name on Card</label>
        <input
          id="billingName"
          name="billingName"
          type="text"
          value={billingName}
          onChange={(e) => setBillingName(e.target.value)}
          placeholder="John Doe"
          required
          aria-required="true"
        />

        {/* Billing Address */}
        <label htmlFor="billingAddress">Billing Address</label>
        <textarea
          id="billingAddress"
          name="billingAddress"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          placeholder="123 Main St, City, Country"
          required
          aria-required="true"
          rows={3}
        ></textarea>

        {/* Error message */}
        {error && (
          <p className="form-error" role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="checkout-button"
          disabled={isProcessing}
          aria-disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </main>
  );
}

export default Checkout;
