import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import api from '../../api/axios';
import '/src/styles/main.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
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

        {role === 'admin' && (
          <Link to="/products/add" className="btn-add-product">
            Add New Product
          </Link>
        )}
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const imageUrl = product.picture
            ? `/uploads/products/${product.picture}`
            : '/default-product.jpg';

          return (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
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

              {/* Add to Cart button */}
              <button
                className="product-detail-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
