import axios from 'axios';
import { Product, ProductFormData } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Get single product
export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

// Add new product
export const addProduct = async (product: ProductFormData): Promise<Product> => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};

// Update product
export const updateProduct = async (id: number, product: ProductFormData): Promise<Product> => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/products/${id}`);
};
