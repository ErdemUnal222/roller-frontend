import { useEffect, useState } from 'react';
import { getAllProducts, createProduct, deleteProduct } from '../../api/productService';
import { Link } from 'react-router-dom';
import '/src/styles/main.scss';

function Products() {
  // State for products and new product form
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);

  // Fetch all products on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data.result) ? data.result : []);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle new product submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createProduct(newProduct);
      setProducts([...products, created]); // Update product list
      setNewProduct({ title: '', description: '', price: '' }); // Reset form
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id)); // Remove deleted product from list
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="admin-products-container">
      <h2 className="admin-products-title">Manage Products</h2>

      {/* New product form */}


      {/* Product list or loading indicator */}
      {loading ? (
        <div className="admin-loading">Loading products...</div>
      ) : (
        <ul className="admin-product-list">
          {products.map((product) => (
            <li key={product.id} className="admin-product-item">
              <div>
                <p className="admin-product-name">{product.title}</p>
                <p className="admin-product-price">{product.price} €</p>
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
