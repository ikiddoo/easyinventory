import axios from 'axios';
import type { AuthResponse } from '../types/auth';
import type { Product } from '../types/product';
import type { RegisterData } from '../types/register';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
);

export const apiService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    return api.post('/auth/login', { username, password });
  },
  async register(registerData: RegisterData): Promise<AuthResponse> {
    return api.post('/auth/register', registerData);
  },
  async getMyProducts(token?: string): Promise<Product[]> {
    return api.get('/product/my-products', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  },
  async addProduct(productData: Product, token?: string): Promise<Product> {
    return api.post('/product', productData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  },
  async deleteProduct(productId: number, token?: string): Promise<void> {
    return api.delete(`/product/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  },
  async updateProduct(productId: number, productData: Partial<Product>, token?: string): Promise<Product> {
    return api.patch(`/product/${productId}`, productData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  },
  async getProduct(productId: number): Promise<Product> {
    return api.get(`/product/${productId}`);
  }
};