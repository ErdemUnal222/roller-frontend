import { useEffect, useState } from 'react';
import { getAllOrders, createOrder } from '../../api/orderService';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ productId: '', quantity: 1 });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    }

    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdOrder = await createOrder(newOrder);
      setOrders([...orders, createdOrder]);
      setNewOrder({ productId: '', quantity: 1 });
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Product ID"
          value={newOrder.productId}
          onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Place Order
        </button>
      </form>

      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-3 rounded">
            Product: {order.productId} — Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
