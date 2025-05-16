// Home.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { vegItems, NonVeg, MilkItems, Chocolate } = useSelector(state => state.products);
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Veg Items',
      description: 'Explore our wide range of fresh vegetables!',
      image: '/vegitems.jpg',
      path: '/vegitems',
    },
    {
      title: 'Non-Veg Items',
      description: 'Premium quality non-veg products for you.',
      image: '/nonvegitems.jpg',
      path: '/nonvegitems',
    },
    {
      title: 'Milk Products',
      description: 'Fresh dairy products straight from farms.',
      image: '/milkitems.jpg',
      path: '/milkitems',
    },
    {
      title: 'Chocolates',
      description: 'Delicious chocolates to satisfy your sweet tooth.',
      image: '/chocolateitems.jpg',
      path: '/chocolateitems',
    },
  ];

  const specialItems = [
    { title: 'Veg', image: '/vegitems.jpg' },
    { title: 'NonVeg', image: '/nonvegitems.jpg' },
    { title: 'Milk', image: '/milkitems.jpg' },
    { title: 'Chocolate', image: '/chocolateitems.jpg' },
  ];

  return (
    <div className="home-container">
      {/* Welcome Banner */}
      <div className="welcome-box">
        <h1>Welcome to Our Store</h1>
        <p>Discover fresh and quality products for your daily needs</p>
      </div>

      {/* Popular Categories */}
      <h1 className="home-title">🍽 Popular Categories</h1>
      <div className="categories-grid">
        {categories.map(cat => (
          <div key={cat.title} className="category-card" onClick={() => navigate(cat.path)}>
            <img src={cat.image} alt={cat.title} className="category-image" />
            <h2>{cat.title}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="why-choose-box">
        <h2>Why Choose Us?</h2>
        <p>
          We offer high-quality products, affordable prices, and fast delivery services. Your satisfaction is our priority!
        </p>
      </div>

      {/* Special Food Items */}
      <h2 className="home-title">Special Food Items</h2>
      <div className="special-scroll-wrapper">
        <div className="special-scroll">
          {specialItems.map(item => (
            <div key={item.title} className="special-item">
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
