import React, { useState } from 'react';
import type { Product } from '../../types/product';
import AddProduct from '../AddProduct/AddProduct';
import ProductListings from '../ProductListing/ProductListings';

const ProductManagement: React.FC<{ token: string }> = ({ token }) => {
  const [currentView, setCurrentView] = useState<'list' | 'add'>('list');
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    setCurrentView('add');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  const handleProductAdded = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  if (currentView === 'add') {
    return (
      <AddProduct
        token={token}
        onProductAdded={handleProductAdded}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <ProductListings
      token={token}
      onAddProduct={handleAddProduct}
    />
  );
};

export default ProductManagement;