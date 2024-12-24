import api from '@/lib/axios';
import type { User, ApiResponse } from '@/types';

export const userService = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUser: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  registerUser() {},
};
