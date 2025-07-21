import React, { useState } from 'react';
import type { Product } from '../../types/product';
import ProductForm from '../AddProduct/AddProduct';
import ProductListings from '../ProductListing/ProductListings';

const ProductManagement: React.FC<{ token: string }> = ({ token }) => {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddProduct = () => {
    setCurrentView('add');
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentView('edit');
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  const handleProductSaved = (product: Product) => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (currentView === 'add') {
    return (
      <ProductForm
        token={token}
        mode="add"
        onProductSaved={handleProductSaved}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'edit' && selectedProduct) {
    return (
      <ProductForm
        token={token}
        mode="edit"
        product={selectedProduct}
        onProductSaved={handleProductSaved}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <ProductListings
      token={token}
      onAddProduct={handleAddProduct}
      onEditProduct={handleEditProduct}
      refreshTrigger={refreshTrigger}
    />
  );
};

export default ProductManagement;