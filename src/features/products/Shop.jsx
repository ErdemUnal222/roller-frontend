import { useEffect, useState } from 'react';
import { getShopProducts } from '../../api/productService';
import { Link } from 'react-router-dom';
import '/src/styles/main.scss';

function Shop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getShopProducts();
        setProducts(Array.isArray(data.result) ? data.result : []);
      } catch (err) {
        console.error('Error fetching shop products:', err);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="shop-container">
      <h1 className="shop-title">Shop</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="shop-product-card">
            {product.picture && (
              <img
                src={`/uploads/products/${product.picture}`}
                alt={product.alt || product.title}
                className="shop-product-img"
              />
            )}
            <h2 className="shop-product-title">{product.title}</h2>
            <p className="shop-product-price">€{product.price}</p>

            <Link to={`/products/${product.id}`} className="shop-product-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Shop;
