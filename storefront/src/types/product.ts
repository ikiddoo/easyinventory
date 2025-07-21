export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  image?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}