import { useEffect, useState } from 'react';
import { getAllProducts, createProduct, deleteProduct } from '../../api/productService';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '/src/styles/main.scss';

function Products() {
  const user = useSelector((state) => state.user.user);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

if (user?.role?.toLowerCase() !== 'admin') {
  return (
    <div className="unauthorized">
      <h2>🚫 Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  );
}

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createProduct(newProduct);
      setProducts([...products, created]);
      setNewProduct({ title: '', description: '', price: '' });
      setSuccess('Product created successfully.');
      setError('');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setSuccess('Product deleted.');
      setError('');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product.');
    }
  };

  return (
    <div className="admin-products-container">
      <h2 className="admin-products-title">Manage Products</h2>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <form onSubmit={handleSubmit} className="admin-product-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {loading ? (
        <div className="admin-loading">Loading products...</div>
      ) : (
        <ul className="admin-product-list">
          {products.map((product) => (
            <li key={product.id} className="admin-product-item">
              <div className="admin-product-info">
                {product.picture && (
                  <img
                    src={`/uploads/products/${product.picture}`}
                    alt={product.alt || 'Product'}
                    className="admin-product-thumbnail"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
                <p className="admin-product-name">{product.title}</p>
                <p className="admin-product-price">Price: {product.price} €</p>
                <p className="admin-product-stock">Stock: {product.stock}</p>
                {product.alt && <p className="admin-product-alt">Alt: {product.alt}</p>}
              </div>

              <div className="admin-product-actions">
                <Link to={`/products/edit/${product.id}`}>Edit</Link>
                <button onClick={() => handleDelete(product.id)} className="delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
