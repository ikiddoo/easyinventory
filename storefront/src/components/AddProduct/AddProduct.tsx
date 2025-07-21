import React, { useState, useEffect } from 'react';
import { apiService } from '../../service/apiservice';
import type { Product } from '../../types/product';

const ProductForm: React.FC<any> = ({ 
  token, 
  mode, 
  product, 
  onProductSaved, 
  onBack 
}) => {
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

  // populate form data when editing
  useEffect(() => {
    if (mode === 'edit' && product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        rating: product.rating?.toString() || '',
        image: product.image || ''
      });
    }
  }, [mode, product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    if (mode === 'add') {
      setFormData({
        name: '',
        description: '',
        price: '',
        rating: '',
        image: ''
      });
    } else if (product) {
      // Reset to original values when editing
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        rating: product.rating?.toString() || '',
        image: product.image || ''
      });
    }
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
      const productData: any = {};
      
      if (mode === 'add') {
        // for add, include all fields
        productData.name = formData.name;
        if (formData.description) productData.description = formData.description;
        productData.price = parseFloat(formData.price);
        if (formData.rating) productData.rating = parseFloat(formData.rating);
        if (formData.image) productData.image = formData.image;
      } else {
        // for edit, only include changed fields
        if (formData.name !== product?.name) productData.name = formData.name;
        if (formData.description !== (product?.description || '')) {
          productData.description = formData.description || undefined;
        }
        if (parseFloat(formData.price) !== product?.price) {
          productData.price = parseFloat(formData.price);
        }
        if (formData.rating && parseFloat(formData.rating) !== product?.rating) {
          productData.rating = parseFloat(formData.rating);
        }
        if (formData.image !== (product?.image || '')) {
          productData.image = formData.image || undefined;
        }
      }

      let savedProduct: Product;
      
      if (mode === 'add') {
        savedProduct = await apiService.addProduct(productData, token);
        showToast('Product added successfully!', 'success');
        resetForm();
      } else {
        savedProduct = await apiService.updateProduct(product!.id, productData, token);
        showToast('Product updated successfully!', 'success');
      }
      
      onProductSaved(savedProduct);
      
      // redirect back after success
      setTimeout(() => {
        onBack();
      }, 2000);
      
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = mode === 'edit';
  const title = isEdit ? 'Edit Product' : 'Add New Product';
  const subtitle = isEdit ? 'Update your product details' : 'Fill in the details to add a new product';
  const submitText = isEdit ? 'Update Product' : 'Add Product';

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
                    {title}
                  </h3>
                  <p className="text-muted mb-0">{subtitle}</p>
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
                  {formData.image && (
                    <div className="mt-2">
                      <small className="text-muted">Preview:</small>
                      <div className="mt-1">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="img-thumbnail"
                          style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className={`btn ${isEdit ? 'btn-success' : 'btn-primary'} btn-lg`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {isEdit ? 'Updating...' : 'Adding Product...'}
                      </>
                    ) : (
                      submitText
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                    disabled={isLoading}
                  >
                    {isEdit ? 'Reset Changes' : 'Clear Form'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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

export default ProductForm;