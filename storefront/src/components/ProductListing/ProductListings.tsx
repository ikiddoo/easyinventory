import { useState, useEffect } from 'react'
import type { Product } from '../../types/product';
import { apiService } from '../../service/apiservice';

const ProductListings: React.FC<{ 
  token: string;
  onAddProduct: () => void;
}> = ({ token, onAddProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getMyProducts(token);
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await apiService.deleteProduct(productId, token);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">My Products</h2>
            <button 
              className="btn btn-primary"
              onClick={onAddProduct}
            >
              ➕ Add New Product
            </button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem' }}>📦</div>
              <h4 className="mt-3 text-muted">No products yet</h4>
              <p className="text-muted">Start by adding your first product!</p>
              <button 
                className="btn btn-primary"
                onClick={onAddProduct}
              >
                ➕ Add Product
              </button>
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    {product.image && (
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      {product.description && (
                        <p className="card-text text-muted">{product.description}</p>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="h5 text-success mb-0">${product.price}</span>
                        {product.rating && (
                          <div className="text-warning">
                            {'★'.repeat(Math.floor(product.rating))}
                            <small className="text-muted ms-1">({product.rating})</small>
                          </div>
                        )}
                      </div>
                      
                      <small className="text-muted">
                        Added {new Date(product.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    
                    <div className="card-footer bg-transparent">
                      <div className="btn-group w-100" role="group">
                        <button type="button" className="btn btn-outline-primary">
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default ProductListings;