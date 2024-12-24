import api from '@/lib/axios';
import type { User, ApiResponse } from '@/types';
import axios from 'axios';

export const userService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUser: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  registerUser: async (data: any) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, data);
    return response;
  },

  registerNewUser: async (data: any) => {
    const response = await api.post(`${import.meta.env.VITE_API_URL}/users/create`, data);
    return response;
  },

  loginUser: async (data: any) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    return response;
  },
};
