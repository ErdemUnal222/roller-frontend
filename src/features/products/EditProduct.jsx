import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/main.scss';

function EditProduct() {
  // Get product ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State for product details
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    alt: ''
  });

  // Image file state
  const [imageFile, setImageFile] = useState(null);

  // Loading and feedback message state
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const result = response.data?.result?.[0];
        if (result) {
          setProduct(result);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all product fields
    for (let key in product) {
      formData.append(key, product[key]);
    }

    // Append new image file if provided
    if (imageFile) {
      formData.append('picture', imageFile);
    }

    try {
      await api.put(`/products/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      // Redirect to product list on success
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setMessage('Error updating product');
    }
  };

  if (loading) {
    return <div className="form-loading">Loading product...</div>;
  }

  return (
    <div className="edit-product-container">
      <h1 className="edit-product-title">Edit Product</h1>

      {message && <p className="form-error">{message}</p>}

      {/* Preview current product image if available */}
      {product.picture && (
        <img
          src={`http://ihsanerdemunal.ide.3wa.io:9500/uploads/${product.picture}`}
          alt={product.alt || 'Product Image'}
          className="product-image"
        />
      )}

      {/* Edit product form */}
      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit" className="form-button">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
