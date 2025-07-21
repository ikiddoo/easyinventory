import type { AuthResponse } from '../types/auth';
import type { Product } from '../types/product';
import type { RegisterData } from '../types/register';


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

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
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

  async addProduct(productData: {
    name: string;
    description?: string;
    price: number;
    rating?: number;
    image?: string;
  }, token: string): Promise<Product> {
    const response = await fetch(`${this.baseURL}/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add product');
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