import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.result);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="text-green-600 font-bold text-xl">{product.price} €</p>
    </div>
  );
};

export default ProductDetail;
