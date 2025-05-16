import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncrementItem } from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './nonveg.css';

function NonVeg() {
  const dispatch = useDispatch();
  const nonVegList = useSelector(state => state.products.NonVeg || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Price slider state
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setMaxPrice(1000);
    setCurrentPage(1);
  };

  // Filter items by price
  const filteredItems = nonVegList.filter(item => item.price <= maxPrice);
  const noItemsFound = filteredItems.length === 0;

  // Pagination on filtered items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (item) => {
    dispatch(IncrementItem(item));
      toast.success("Your order has been placed successfully!");
  };

  return (
    <div className="nonveg-container" style={{ display: 'flex', gap: '20px' }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar Filter */}
      <div style={{ minWidth: '200px' }}>
        <h3>Filter by Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={handlePriceChange}
          style={{ width: '100%' }}
        />
        <p>Max Price: ₹{maxPrice}</p>
        <button onClick={handleClearFilter} style={{ marginTop: '10px', cursor: 'pointer' }}>
          Clear Filter
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <h1>Non-Veg Items</h1>

        {noItemsFound && <p>No items found under ₹{maxPrice}.</p>}

        <div className="nonveg-grid">
          {currentItems.map((item, index) => (
            <div key={index} className="nonveg-item">
              <img src={item.image} alt={item.name} className="nonveg-image" />
              <p>{item.name}</p>
              <p>₹{parseFloat(item.price).toFixed(2)}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              style={{
                margin: '0 5px',
                fontWeight: currentPage === index + 1 ? 'bold' : 'normal'
              }}
            >
              {index + 1}
            </button>
          ))}

          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default NonVeg;
