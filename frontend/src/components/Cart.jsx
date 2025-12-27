import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [showPayment, setShowPayment] = React.useState(false);

    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <h1 className="cart-title">Your Cart</h1>
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Link to="/" className="back-btn" style={{ marginTop: '2rem' }}>Start Shopping</Link>
                </div>
            </div>
        );
    }

    const handleCheckout = () => {
        setShowPayment(true);
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>

            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.imageUrl || 'https://placehold.co/100x100/1e293b/d4af37?text=No+Image'}
                            alt={item.name}
                            className="cart-item-image"
                        />

                        <div className="cart-item-details">
                            <span className="cart-item-brand">{item.brand}</span>
                            <h3>{item.name}</h3>
                        </div>

                        <div className="quantity-controls">
                            <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >-</button>
                            <span>{item.quantity}</span>
                            <button
                                className="quantity-btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >+</button>
                        </div>

                        <div className="cart-item-price">
                            ₹{item.price * item.quantity}
                        </div>

                        <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="total-price">
                    Total: ₹{getCartTotal()}
                </div>

                {!showPayment ? (
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Pay Now
                    </button>
                ) : (
                    <div className="payment-section">
                        <h3>Scan to Pay</h3>
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=client@upi&pn=GewaClient"
                            alt="Payment QR Code"
                            className="qr-code"
                        />
                        <p className="payment-instructions">
                            1. Scan the QR code with your UPI app.<br />
                            2. Pay <strong>₹{getCartTotal()}</strong>.<br />
                            3. Call us to confirm your order:
                        </p>
                        <div className="client-phone">
                            📞 +91 9503579666
                        </div>
                        <button className="close-payment-btn" onClick={() => setShowPayment(false)}>Close</button>
                    </div>
                )}

                <button className="remove-btn" onClick={clearCart} style={{ border: 'none', color: '#94a3b8', fontSize: '0.9rem', marginTop: '1rem' }}>
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default Cart;
