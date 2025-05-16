import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IncrementItem } from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './milk.css';

function MilkItems() {
  const dispatch = useDispatch();
  const milkList = useSelector(state => state.products.MilkItems || []);

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

  // Handle price checkbox toggle
  const handleCheckboxChange = (label) => {
    setCurrentPage(1);
    setSelectedPrices(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  const handleClearFilter = () => {
    setSelectedPrices([]);
    setCurrentPage(1);
  };

  // Filter milk items by selected price ranges
  const filteredItems = selectedPrices.length > 0
    ? milkList.filter(item =>
        selectedPrices.some(label => {
          const range = priceRanges.find(r => r.label === label);
          return item.price >= range.min && item.price <= range.max;
        })
      )
    : milkList;

  const noItemsFound = filteredItems.length === 0;

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(IncrementItem(item));
    toast.success("Your order has been placed successfully!");
  };

  return (
    <div className="milk-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Milk Items</h1>

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

      {/* Grid */}
      <div className="milk-grid">
        {currentItems.map((item, index) => (
          <div key={index} className="milk-item">
            <img src={item.image} alt={item.name} className="milk-image" />
            <p>{item.name}</p>
            <p>₹{parseFloat(item.price).toFixed(2)}</p>
            <button className="milk-add-btn" onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}

export default MilkItems;
