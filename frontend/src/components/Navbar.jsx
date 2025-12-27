import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { getCartCount } = useCart();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">GEWA</div>
      <ul className="navbar-links">
        <li className="nav-link"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
        {localStorage.getItem('isAdmin') === 'true' && (
          <li className="nav-link"><Link to="/add-product" style={{ color: 'inherit', textDecoration: 'none' }}>Add Product</Link></li>
        )}
        <li className="nav-link">Categories</li>
        <li className="nav-link">
          <Link to="/cart" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Cart
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </Link>
        </li>
      </ul>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="admin-toggle"
          onClick={() => {
            const current = localStorage.getItem('isAdmin') === 'true';
            if (current) {
              localStorage.setItem('isAdmin', 'false');
              alert("Admin Mode Disabled");
            } else {
              const pass = prompt("Enter Admin Password:");
              if (pass === "admin123") {
                localStorage.setItem('isAdmin', 'true');
                alert("Admin Mode Enabled");
              } else {
                alert("Wrong Password");
              }
            }
            window.location.reload(); // Reload to apply changes
          }}
          title="Toggle Admin Mode"
        >
          🔒
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
