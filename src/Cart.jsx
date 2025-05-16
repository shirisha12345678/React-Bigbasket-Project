
// // src/components/Cart.jsx
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IncrementItem, DecrementItem, RemoveItem, clearCart } from './store'; 
// import './cart.css';
// import { addOrder } from './store'; 
// import QRCode from 'react-qr-code'; 


// function Cart() {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const [discountPercent, setDiscountPercent] = useState(0);

//   const discountAmount = (totalPrice * discountPercent) / 100;
//   const taxAmount = ((totalPrice - discountAmount) * 5) / 100;
//   const finalPrice = totalPrice - discountAmount + taxAmount;

//   // ✅ Add Place Order Handler
//   const handlePlaceOrder = () => {
//     const orderData = {
//       id: Date.now(),
//       date: new Date().toLocaleString(),
//       items: cartItems,
//       total: finalPrice.toFixed(2),
//     };

//     dispatch(addOrder(orderData));
//     dispatch(clearCart());
//     alert('✅ Order placed successfully!');
//   };


// const [paymentMethod, setPaymentMethod] = useState('');

//   const cartListItems = cartItems.map((item, index) => (
//     <li key={index}>
//       <div className="cart-item-info">
//         <span>{index + 1}. Name: {item.name} Price ₹{item.price} Quantity: {item.quantity}</span>
//       </div>
//       <div className="cart-buttons">
//         <button className="plus-btn" onClick={() => dispatch(IncrementItem(item))}>+</button>
//         <button className="minus-btn" onClick={() => dispatch(DecrementItem(item))}>–</button>
//         <button className="remove-btn" onClick={() => dispatch(RemoveItem(item))}>Remove</button>
//       </div>
//     </li>
//   ));

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       <h3>Total Items: {totalCartCount}</h3>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>{cartListItems}</ul>
//       )}

//       {cartItems.length > 0 && (
//         <div className="summary-box">
//           <h2>Your Total Price: ₹{totalPrice.toFixed(2)}</h2>

//           <div className="discount-buttons">
//             <button onClick={() => setDiscountPercent(10)}>Apply 10% Discount</button>
//             <button onClick={() => setDiscountPercent(20)}>Apply 20% Discount</button>
//             <button onClick={() => setDiscountPercent(30)}>Apply 30% Discount</button>
//           </div>

//           <p>Discount Percentage {discountPercent}% : ₹{discountAmount.toFixed(2)}</p>
//           <p>Tax (5%): ₹{taxAmount.toFixed(2)}</p>
//           <h3>Final Price to Pay: ₹{finalPrice.toFixed(2)}</h3>

//           {/* ✅ Order Button Added */}
//           <button className="place-order-btn" onClick={handlePlaceOrder}>
//             🛒 Place Order
//           </button>

// {/* Payment Method Selection */}
// <div className="payment-method">
//   <h3>🧾 Select Payment Method:</h3>
//   <button onClick={() => setPaymentMethod('qr')}>📱 QR Code</button>
//   <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
// </div>

// {/* QR Code Payment */}
// {paymentMethod === 'qr' && (
//   <div className="qr-section">
//     <h4>📷 Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
//     <QRCode
//       value={`upi://pay?pa=9059194590@ybl&pn=YourStoreName&am=${finalPrice.toFixed(2)}&cu=INR`}
//     />
//     <p>UPI ID: 9059194590@ybl</p>
//   </div>
// )}

// {/* Card Payment */}
// {paymentMethod === 'card' && (
//   <div className="card-section">
//     <h4>💳 Enter Card Details</h4>
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       alert('✅ Card payment processed successfully!');
//     }}>
//       <div>
//         <label>Card Number: </label>
//         <input type="text" placeholder="1234 5678 9012 3456" required />
//       </div>
//       <div>
//         <label>Cardholder Name: </label>
//         <input type="text" placeholder="shirisha thanugula" required />
//       </div>
//       <div>
//         <label>Expiry Date: </label>
//         <input type="text" placeholder="MM/YY" required />
//       </div>
//       <div>
//         <label>CVV: </label>
//         <input type="password" placeholder="123" required />
//       </div>
//       <button type="submit">💳 Pay ₹{finalPrice.toFixed(2)}</button>
//     </form>
//   </div>
// )}


//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;


// src/components/Cart.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IncrementItem,
  DecrementItem,
  RemoveItem,
  clearCart,
  addOrder,
} from './store';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import './cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeDiscountPercent, setCouponCodeDiscountPercent] = useState(0);
  const [couponName, setCouponName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const UPI_ID = '9059194590@ybl';

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (totalPrice * discountPercent) / 100;
  const afterDiscount = totalPrice - discountAmount;
  const couponDiscount = (afterDiscount * couponCodeDiscountPercent) / 100;
  const taxAmount = ((afterDiscount - couponDiscount) * 5) / 100;
  const finalPrice = afterDiscount - couponDiscount + taxAmount;

  const SERVICE_ID = 'service_p3hvfbf';
  const TEMPLATE_ID = 'template_noqw7ct';
  const PUBLIC_KEY = '2rTQ8uQLxGTl_XEnF';

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponName(code);
    switch (code) {
      case 'RATAN10':
        setCouponCodeDiscountPercent(10);
        break;
      case 'RATAN20':
        setCouponCodeDiscountPercent(20);
        break;
      case 'RATAN30':
        setCouponCodeDiscountPercent(30);
        break;
      default:
        alert('❌ Invalid Coupon Code');
        setCouponCodeDiscountPercent(0);
        setCouponName('');
    }
  };

  const handlePlaceOrder = () => {
    if (!userEmail || !userEmail.includes('@')) {
      alert('❗ Please enter a valid email address.');
      return;
    }

    const orderData = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total: finalPrice.toFixed(2),
    };

    const formattedItems = cartItems.map((item) => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
    }));

    const templateParams = {
      order_id: orderData.id,
      orders: formattedItems,
      cost: {
        shipping: '0.00',
        tax: taxAmount.toFixed(2),
      },
      email: userEmail,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => console.log('✅ Email sent successfully'))
      .catch((error) => console.error('❌ Email sending failed:', error));

    dispatch(addOrder(orderData));
    dispatch(clearCart());
    alert('✅ Order placed successfully!');
    navigate('/orders');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <h3>Total Items: {totalCartCount}</h3>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="cart-item-info">
                <span>
                  {index + 1}. Name: {item.name} Price ₹{item.price} Quantity: {item.quantity}
                </span>
              </div>
              <div className="cart-buttons">
                <button className="plus-btn" onClick={() => dispatch(IncrementItem(item))}>
                  +
                </button>
                <button className="minus-btn" onClick={() => dispatch(DecrementItem(item))}>
                  –
                </button>
                <button className="remove-btn" onClick={() => dispatch(RemoveItem(item))}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="summary-box">
          <h2>Your Total Price: ₹{totalPrice.toFixed(2)}</h2>

          <div className="discount-buttons">
            <button onClick={() => setDiscountPercent(10)}>Apply 10% Discount</button>
            <button onClick={() => setDiscountPercent(20)}>Apply 20% Discount</button>
            <button onClick={() => setDiscountPercent(30)}>Apply 30% Discount</button>
          </div>

          <p>Discount ({discountPercent}%): ₹{discountAmount.toFixed(2)}</p>

          <div className="coupon-box">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Coupon Code (RATAN10/20/30)"
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
            {couponName && (
              <p className="text-info">
                Coupon "{couponName}" Applied: -₹{couponDiscount.toFixed(2)}
              </p>
            )}
          </div>

          <p>Tax (5%): ₹{taxAmount.toFixed(2)}</p>
          <h3>Final Price to Pay: ₹{finalPrice.toFixed(2)}</h3>

          <div className="email-box">
            <label>📧 Enter your Gmail for order confirmation:</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={!userEmail || cartItems.length === 0}
          >
            🛒 Place Order
          </button>

          <div className="payment-method">
            <h3>🧾 Select Payment Method:</h3>
            <button onClick={() => setPaymentMethod('qr')}>📱 QR Code</button>
            <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
          </div>

          {paymentMethod === 'qr' && (
            <div className="qr-section">
              <h4>📷 Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
              <QRCode value={`upi://pay?pa=${UPI_ID}&pn=YourStoreName&am=${finalPrice.toFixed(2)}&cu=INR`} />
              <p>UPI ID: {UPI_ID}</p>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="card-section">
              <h4>💳 Enter Card Details</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('✅ Card payment processed successfully!');
                }}
              >
                <div>
                  <label>Card Number:</label>
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </div>
                <div>
                  <label>Cardholder Name:</label>
                  <input type="text" placeholder="shirisha thanugula" required />
                </div>
                <div>
                  <label>Expiry Date:</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div>
                  <label>CVV:</label>
                  <input type="password" placeholder="123" required />
                </div>
                <button type="submit">💳 Pay ₹{finalPrice.toFixed(2)}</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
