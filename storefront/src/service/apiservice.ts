import type { AuthResponse } from '../types/auth';
import type { Product } from '../types/product';

export const apiService = {
  baseURL: 'http://localhost:3000',
  
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },
  
  async getMyProducts(token: string): Promise<Product[]> {
    const response = await fetch(`${this.baseURL}/product/my-products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch products');
    }
    
    return response.json();
  },
  
  async deleteProduct(productId: number, token: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
  }
};