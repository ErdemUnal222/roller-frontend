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

  // States for displaying feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    if (image) {
      formData.append('picture', image);
    }

    try {
      setLoading(true);
      setError('');
      await axios.post('/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setSuccess('Product created successfully!');
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Add New Product</h2>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}

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

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
