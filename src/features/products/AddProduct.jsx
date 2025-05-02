import { useState } from 'react';
import { createProduct } from '../../api/productService';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    picture: '',
    alt: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      navigate('/products'); // ✅ After creation, go back to products list
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
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
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={newProduct.picture}
          onChange={(e) => setNewProduct({ ...newProduct, picture: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Image Alt Text"
          value={newProduct.alt}
          onChange={(e) => setNewProduct({ ...newProduct, alt: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <button type="submit" className="bg-purple-600 text-white p-3 rounded w-full hover:bg-purple-700">
          Save Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
