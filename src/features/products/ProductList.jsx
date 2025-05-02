import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">All Products</h1>
        {/* ✅ Link to add a new product */}
        <Link to="/products/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          ➕ Add New Product
        </Link>
      </div>

      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.price}€</p>
            <Link to={`/productslist/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
