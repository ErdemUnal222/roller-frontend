import { useEffect, useState } from 'react';
import { getAllOrders, createOrder } from '../../api/orderService';
import '/src/styles/main.scss';

function Orders() {
  // State to store the list of orders
  const [orders, setOrders] = useState([]);

  // State to manage the new order form
  const [newOrder, setNewOrder] = useState({ productId: '', quantity: 1 });

  // Fetch all orders on component mount
  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders(); // Fetch orders from the API
        setOrders(data); // Update the state with the fetched orders
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    }

    fetchOrders();
  }, []);

  // Handle form submission to create a new order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdOrder = await createOrder(newOrder); // API call to create the order
      setOrders([...orders, createdOrder]); // Append the new order to the existing list
      setNewOrder({ productId: '', quantity: 1 }); // Reset the form
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {/* Order creation form */}
      <form onSubmit={handleSubmit} className="orders-form">
        <input
          type="text"
          placeholder="Product ID"
          value={newOrder.productId}
          onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Place Order</button>
      </form>

      {/* Orders list */}
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Product:</strong> {order.productId} — <strong>Quantity:</strong> {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
