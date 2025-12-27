import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import { useCart } from '../context/CartContext';

import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

const Home = ({ keyword }) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = keyword
            ? `${API_URL}/api/products/search?keyword=${keyword}`
            : `${API_URL}/api/products`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Is the backend running?");
                setLoading(false);
            });
    }, [keyword]);

    if (loading) return <div className="text-center p-10">Loading amazing jewelry...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="home-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image-container">
                                <img
                                    src={product.imageUrl || 'https://placehold.co/600x400/1e293b/d4af37?text=No+Image'}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                            <div className="product-info">
                                <span className="product-brand">{product.brand}</span>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                                <div className="product-price">₹{product.price}</div>
                                <button className="add-to-cart-btn" onClick={(e) => {
                                    e.preventDefault(); // Prevent navigation when clicking "Add to Cart"
                                    addToCart(product);
                                    alert('Added to cart!');
                                }}>Add to Cart</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
