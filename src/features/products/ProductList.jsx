import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import api from '../../api/axios';
import '/src/styles/main.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Correct selector based on store.js setup
  const user = useSelector((state) => state.user.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(Array.isArray(response.data.result) ? response.data.result : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">All Products</h1>

        {/* Admin Add Button */}
        {user?.isAdmin && (
          <Link to="/products/add" className="btn-add-product">
            Add New Product
          </Link>
        )}
      </div>

      {error && <p className="form-error">{error}</p>}
      {loading ? (
        <p className="admin-loading">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => {
              const imageUrl = product.picture
                ? `/uploads/products/${product.picture}`
                : '/default-product.jpg';

              return (
                <div key={product.id} className="product-card">
                  <Link to={`/shop/${product.id}`}>
                    <img
                      src={imageUrl}
                      alt={product.alt || product.title}
                      className="product-image"
                    />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-description">
                      {product.description?.slice(0, 60)}...
                    </p>
                    <p className="product-price">€{product.price}</p>
                  </Link>

                  <button
                    className="product-detail-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
