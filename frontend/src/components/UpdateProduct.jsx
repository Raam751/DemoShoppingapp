import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddProduct.css'; // Reuse styles

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: '',
        productAvailable: true
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setPreview(data.imageUrl); // Show existing image
            })
            .catch(err => console.error("Error loading product", err));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

        try {
            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                alert('Product updated successfully!');
                navigate(`/product/${id}`);
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating product');
        }
    };

    return (
        <div className="add-product-container">
            <h1>Update Product</h1>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Brand</label>
                    <input type="text" name="brand" value={product.brand} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={product.description} onChange={handleInputChange} required rows="4" />
                </div>

                <div className="form-group">
                    <label>Price (₹)</label>
                    <input type="number" name="price" value={product.price} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input type="text" name="category" value={product.category} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Upload New Image (Optional)</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                </div>

                <button type="submit" className="submit-btn">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
