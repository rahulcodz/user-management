import api from '@/lib/axios';
import type { Post, ApiResponse } from '@/types';

export const postService = {
  getPosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await api.get('/task');
    return response.data;
  },

  getPost: async (id: number): Promise<ApiResponse<Post>> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  registerNewTask: async (data: any) => {
    const response = await api.post(`/task`, data);
    return response;
  },
};
