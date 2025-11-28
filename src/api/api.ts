// src/api/api.ts
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API calls
export const registerUser = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/users/register', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/users/login', data);
    return response.data;
  } catch (error: any) {
    throw error.
