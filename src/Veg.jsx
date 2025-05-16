// React and Redux imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncrementItem } from './store';

// Toastify for notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom styles
import './veg.css';

function Veg() {
  // Get vegItems from Redux store
  const vegItems = useSelector(globalstate => globalstate.products.vegItems);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Price filter state
  const [selectedPrices, setSelectedPrices] = useState([]);

  // Price range options for filtering
  const priceRanges = [
    { label: '₹0–49', min: 0, max: 49 },
    { label: '₹50–99', min: 50, max: 99 },
    { label: '₹100–199', min: 100, max: 199 },
    { label: '₹200 and above', min: 200, max: Infinity }
  ];

  // Handle price filter checkbox toggle
  const handleCheckboxChange = (rangeLabel) => {
    setCurrentPage(1); // Reset to page 1 when filter changes
    setSelectedPrices(prev =>
      prev.includes(rangeLabel)
        ? prev.filter(item => item !== rangeLabel) // Uncheck
        : [...prev, rangeLabel] // Check
    );
  };

  // Clear all filters
  const handleClearFilter = () => {
    setSelectedPrices([]);
    setCurrentPage(1);
  };

  // Filter items based on selected price ranges
  const filteredItems = selectedPrices.length > 0
    ? vegItems.filter(item =>
        selectedPrices.some(label => {
          const range = priceRanges.find(r => r.label === label);
          return item.price >= range.min && item.price <= range.max;
        })
      )
    : vegItems;

  // Check if no items found after filtering
  const noItemsFound = filteredItems.length === 0;

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Add item to cart and show success toast
  const handleAddToCart = (item) => {
    dispatch(IncrementItem(item)); // Redux dispatch
    toast.success('Your order has been placed successfully!'); // Toast message
  };

  return (
    <div className="veg-container">
      {/* Toast container for showing notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <h1>Veg Items</h1>

      {/* Filter UI */}
      <div style={{ marginBottom: '20px' }}>
        <strong>Filter by Price:</strong>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          {priceRanges.map(range => (
            <label key={range.label}>
              <input
                type="checkbox"
                checked={selectedPrices.includes(range.label)}
                onChange={() => handleCheckboxChange(range.label)}
              />
              {range.label}
            </label>
          ))}
        </div>

        {/* Clear filter button */}
        {selectedPrices.length > 0 && (
          <button
            style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
            onClick={handleClearFilter}
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* No items message */}
      {noItemsFound && <p>No items found in the selected price range.</p>}

      {/* Items grid */}
      <div className="veg-grid">
        {currentItems.map((item, index) => (
          <div key={index} className="veg-item">
            <img src={item.image} alt={item.name} className="veg-image" />
            <p>{item.name}</p>
            <p>₹{item.price}</p>

            {/* Add to cart button */}
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {/* Page numbers */}
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
  );
}

export default Veg;
