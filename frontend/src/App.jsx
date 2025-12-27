import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [theme, setTheme] = React.useState('dark');
  const [keyword, setKeyword] = React.useState('');

  const handleSearch = (term) => {
    setKeyword(term);
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar onSearch={handleSearch} />
      <main className="main-content">
        <h1>Welcome to GEWA</h1>
        <p>Exquisite Jewelry for the Modern Soul</p>
        <Routes>
          <Route path="/" element={<Home keyword={keyword} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/add-product"
            element={
              localStorage.getItem('isAdmin') === 'true'
                ? <AddProduct />
                : <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>Access Denied. Admins Only.</div>
            }
          />
          <Route
            path="/update-product/:id"
            element={
              localStorage.getItem('isAdmin') === 'true'
                ? <UpdateProduct />
                : <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>Access Denied. Admins Only.</div>
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
