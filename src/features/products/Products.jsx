import { useEffect, useState } from 'react';
import { getAllProducts, createProduct, deleteProduct } from '../../api/productService';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await createProduct(newProduct);
      setProducts([...products, created]);
      setNewProduct({ title: '', description: '', price: '' });
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Product title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded w-full">
          Add Product
        </button>
      </form>

      {loading ? (
        <div className="text-center text-gray-500">Loading products...</div>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-gray-500">{product.price} €</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/products/edit/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline"
                >
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
