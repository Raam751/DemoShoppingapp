import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { API_URL } from '../config';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setError("Failed to load product details.");
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${API_URL}/api/products/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert("Product deleted successfully");
                    navigate('/');
                } else {
                    alert("Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error deleting product");
            }
        }
    };

    if (loading) return <div className="text-center p-10">Loading details...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center p-10">Product not found</div>;

    return (
        <div className="product-details-container">
            <Link to="/" className="back-btn">← Back to Products</Link>

            <div className="product-details-content">
                <div className="details-image-container">
                    <img
                        src={product.imageUrl || 'https://placehold.co/600x600/1e293b/d4af37?text=No+Image'}
                        alt={product.name}
                        className="details-image"
                    />
                </div>

                <div className="details-info">
                    <span className="details-brand">{product.brand}</span>
                    <h1>{product.name}</h1>
                    <div className="details-price">₹{product.price}</div>

                    <div className={`stock-status ${product.productAvailable ? 'in-stock' : 'out-of-stock'}`}>
                        {product.productAvailable ? 'In Stock' : 'Out of Stock'}
                    </div>

                    <p className="details-description">{product.description}</p>

                    <div className="action-buttons">
                        <button className="add-to-cart-large">Add to Cart</button>
                        {localStorage.getItem('isAdmin') === 'true' && (
                            <>
                                <Link to={`/update-product/${id}`} className="update-btn">Update</Link>
                                <button onClick={handleDelete} className="delete-btn">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
