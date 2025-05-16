// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaHome,
  FaCarrot,
  FaDrumstickBite,
  FaGlassWhiskey,
  FaIceCream,
  FaShoppingCart,
  FaPhone,
  FaInfoCircle,
  FaCartPlus,
  FaPenNib,
} from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  // Pull total cart count from Redux state (assuming it's stored as cartCount)
  // const cartCount = useSelector(state => state.cart.cartCount);

  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  
  return (
    <nav className="navbar">
      <Link to="/Home"><FaHome /> Home</Link>
      <Link to="/VegItems"><FaCarrot /> Veg Items</Link>
      <Link to="/NonVegItems"><FaDrumstickBite /> Non-Veg</Link>
      <Link to="/MilkItems"><FaGlassWhiskey /> Milk</Link>
      <Link to="/Chocolate"><FaIceCream /> Chocolate</Link>
      <Link to="/Orders"><FaShoppingCart /> Orders</Link>
      <Link to="/Cart" className="cart-link">
        <FaCartPlus /> Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>} {/* Show cart count */}
      </Link>
      <Link to="/AboutUs"><FaInfoCircle /> About Us</Link>
      <Link to="/ContactUs"><FaPhone /> Contact Us</Link>
      <Link to="/Signing"><FaPenNib /> Sign In</Link>
    </nav>
  );
}
