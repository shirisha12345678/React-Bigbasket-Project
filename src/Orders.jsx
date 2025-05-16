import React from "react";
import { useSelector } from 'react-redux';
import "./orders.css";

function Orders() {
  const orders = useSelector(state => state.orders);

  if (orders.length === 0) {
    return <h2 className="no-orders">No orders placed yet 🛍</h2>;
  }

  return (
    <div className="order-list">
      <h1>🧾 Order History</h1>
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>Order ID: {order.id}</h3>
          <p>Date: {order.date}</p>
          <p>Total: ₹{order.total}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map(item => (
              <li key={item.name + order.id}>
                {item.name} × {item.quantity} — ₹{item.price} each
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
