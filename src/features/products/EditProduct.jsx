import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/main.scss';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    alt: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        const result = response.data?.result?.[0];
        if (result) {
          setProduct(result);
          if (result.picture) {
            setPreviewUrl(`http://ihsanerdemunal.ide.3wa.io:9500/uploads/${result.picture}`);
          }
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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    if (imageFile) {
      formData.append('picture', imageFile);
    }

    try {
      await api.put(`/products/edit/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      console.error('Error updating product:', err);
      setMessage('Error updating product');
    }
  };

  if (loading) return <div className="form-loading">Loading product...</div>;

  return (
    <div className="edit-product-container">
      <h1 className="edit-product-title">Edit Product</h1>

      {message && <p className="form-error">{message}</p>}
      {success && <p className="form-success">{success}</p>}

      {previewUrl && (
        <img
          src={previewUrl}
          alt={product.alt || 'Product Preview'}
          className="product-image"
        />
      )}

      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-input"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-input"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="form-input"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="form-input"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input"
        />

        <button type="submit" className="form-button">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
