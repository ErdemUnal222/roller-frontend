import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../../api/productService';
import '/src/styles/main.scss';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getOneProduct(id);
        if (data && data.result) {
          setProduct(data.result);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="form-error">{error}</div>;
  if (!product) return null;

  const formattedDate = new Date(product.created_at).toLocaleDateString('en-GB');
  const imageUrl = product.picture
    ? `http://ihsanerdemunal.ide.3wa.io:9500/uploads/${product.picture}`
    : null;

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">{product.title}</h2>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.alt || 'Product image'}
          className="product-detail-image"
        />
      )}

      <p className="product-detail-description">{product.description}</p>

      <p className="product-detail-price"><strong>Price:</strong> {product.price} €</p>

      <p className="product-detail-stock">
        <strong>Availability:</strong>{' '}
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>

      <p className="product-detail-date">
        <strong>Added on:</strong> {formattedDate}
      </p>
    </div>
  );
}

export default ProductDetail;
