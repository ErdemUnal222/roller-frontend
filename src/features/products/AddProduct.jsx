import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '/src/styles/main.scss';

function AddProduct() {
  // State for form inputs
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    alt: '',
  });

  // State to store selected image file
  const [image, setImage] = useState(null);

  // State for displaying errors
  const [error, setError] = useState('');

  // Navigation hook to redirect on success
  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Update image file when selected
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all form fields to formData
    for (let key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    // Append image if selected
    if (image) {
      formData.append('picture', image);
    }

    try {
      // Send POST request to backend
      await axios.post('/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      // Redirect to products list on success
      navigate('/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>

      {error && <div className="form-error">{error}</div>}

      {/* Product creation form */}
      <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          required
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="alt"
          placeholder="Alt text"
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input"
        />

        <button type="submit" className="form-button">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
