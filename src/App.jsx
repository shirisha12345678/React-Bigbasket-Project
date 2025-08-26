import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {
  FaCarrot,
  FaDrumstickBite,
  FaGlassWhiskey,
  FaHome,
  FaIceCream,
  FaInfoCircle,
  FaShoppingCart,
  FaPhone,
  FaCartPlus,
  FaPenNib,
} from 'react-icons/fa';


import './App.css'; // Optional: Your styles here
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import MilkItems from './MilkItems';
import Chocolate from './Chocolate';
import Orders from './Orders';
import Cart from './Cart';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Signing from './Signing';
import Navbar from './Navbar';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import './store';

function App() {
const count = useSelector(state => 
  state.cart.reduce((total, item) => total + item.quantity, 0)
);


  return (
    
    <BrowserRouter>
      <nav>
        <Link to='/Home'><FaHome /> Home</Link>
        <Link to='/VegItems'><FaCarrot /> Vegitems</Link>
        <Link to='/NonVegItems'><FaDrumstickBite /> NonVegitems</Link>
        <Link to='/MilkItems'><FaGlassWhiskey /> MilkItems</Link>
        <Link to='/Chocolate'><FaIceCream /> Chocolate</Link>
        <Link to='/Orders'><FaShoppingCart /> Orders</Link>
        <Link to='/Cart'><FaCartPlus /> Cart {count}</Link>
        <Link to='/AboutUs'><FaInfoCircle /> AboutUs</Link>
        <Link to='/ContactUs'><FaPhone /> ContactUs</Link>
        <Link to='/Signing'><FaPenNib /> Signing</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/VegItems' element={<Veg />} />
          <Route path='/NonVegItems' element={<NonVeg />} />
          <Route path='/MilkItems' element={<MilkItems />} />
          <Route path='/Chocolate' element={<Chocolate />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Signing' element={<Signing />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Navbar' element={<Navbar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
