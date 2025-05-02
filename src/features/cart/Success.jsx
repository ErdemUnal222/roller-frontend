import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const order = useSelector((state) => state.order.latestOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (!order) {
      navigate('/', { replace: true }); // redirect if no order
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h2>
      <p className="mb-4">Thank you, <strong>{order.name}</strong>! Your order has been placed.</p>

      <div className="text-left mb-4">
        <h3 className="font-semibold">Shipping Info:</h3>
        <p>{order.name}</p>
        <p>{order.email}</p>
        <p>{order.address}</p>
      </div>

      <div className="text-left mb-4">
        <h3 className="font-semibold mb-2">Items:</h3>
        <ul className="list-disc list-inside">
          {order.items.map((item) => (
            <li key={item.id}>
              {item.title} × {item.quantity} — €{item.price}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xl font-bold">Total Paid: €{order.total.toFixed(2)}</p>
    </div>
  );
}

export default Success;
