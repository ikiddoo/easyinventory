import React, { useState } from 'react';
import { apiService } from '../../service/apiservice';
import type { Product } from '../../types/product';

const AddProduct: React.FC<{ 
  token: string; 
  onProductAdded: (product: Product) => void;
  onBack: () => void;
}> = ({ token, onProductAdded, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    image: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      rating: '',
      image: ''
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        image: formData.image || undefined,
      };

      const newProduct = await apiService.addProduct(productData, token);
      showToast('Product added successfully!', 'success');
      resetForm();
      onProductAdded(newProduct);
      
      // Auto-redirect back to listings after 2 seconds
      setTimeout(() => {
        onBack();
      }, 2000);
      
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <button 
                  className="btn btn-outline-secondary me-3"
                  onClick={onBack}
                  type="button"
                >
                  ← Back
                </button>
                <div>
                  <h3 className="fw-bold text-primary mb-1">
                    Add New Product
                  </h3>
                  <p className="text-muted mb-0">Fill in the details to add a new product</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Product Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label fw-semibold">
                      Price <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="rating" className="form-label fw-semibold">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="5.0"
                      step="0.1"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-semibold">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding Product...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div className="toast show" role="alert">
            <div className={`toast-header ${toast.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
              <strong className="me-auto">
                {toast.type === 'success' ? '✅ Success' : '❌ Error'}
              </strong>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setToast(prev => ({ ...prev, show: false }))}
              ></button>
            </div>
            <div className="toast-body">
              {toast.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;