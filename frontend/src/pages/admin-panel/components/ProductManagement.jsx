import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import dataService from '../../../services/dataService';
import productApi from '../../../services/productApi';
import apiClient from '../../../services/api';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import ProductForm from './ProductForm';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    await checkBackendHealth();
    await loadProducts();
    await loadCategories();
  };

  const checkBackendHealth = async () => {
    try {
      await apiClient.get('/categories');
      setBackendStatus('online');
    } catch {
      setBackendStatus('offline');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await dataService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);

      let apiProducts = [];

      try {
        const response = await productApi.admin.getAll();
        apiProducts = Array.isArray(response) ? response : [];
      } catch (error) {
        const fallback = await dataService.getProducts();
        apiProducts = fallback?.data || [];
      }

      const formatted = apiProducts.map((p) => ({
        id: p.id,
        name: p.name || 'No Name',
        description: p.description || 'No description',
        price: p.price || 0,
        stock: p.stockQuantity || 0,
        category: p.category || '',
        inStock: p.inStock !== false,
        image: resolveImageUrl(p.imageUrl)
      }));

      setProducts(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await dataService.deleteProduct(id);
    loadProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-10 text-center">Loading products...</div>;
  }

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-gray-500">Manage your products</p>
        </div>

        <Button onClick={() => setShowProductForm(true)}>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >

            {/* IMAGE SECTION */}
            <div className="h-48 bg-gray-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* ACTION BUTTONS */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 bg-white rounded-full shadow"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 bg-white rounded-full shadow text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

           {/* TITLE */}
<div className="p-3">
  <h3 className="font-semibold text-gray-900 line-clamp-1">
    {product.name}
  </h3>
</div>

{/* DESCRIPTION */}
<div className="p-3">
  <p className="text-sm text-gray-600 line-clamp-2">
    {product.description}
  </p>
</div>

{/* PRICE + STOCK */}
<div className="p-3 flex justify-between items-center">
  <span className="text-lg font-bold text-green-600">
    ₹{product.price}
  </span>

  <span className={`text-xs px-2 py-1 rounded-full ${
    product.inStock
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'
  }`}>
    {product.inStock ? 'In Stock' : 'Out of Stock'}
  </span>
</div>

            {/* BUTTON */}
            {/* <div className="p-3">
              <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                View Product
              </button>
            </div> */}

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products found
        </div>
      )}

      {/* PRODUCT FORM */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={() => {
            setShowProductForm(false);
            setEditingProduct(null);
            loadProducts();
          }}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
};

export default ProductManagement;