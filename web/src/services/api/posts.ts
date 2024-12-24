import api from '@/lib/axios';
import type { Post, ApiResponse } from '@/types';

export const postService = {
  getPosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPost: async (id: number): Promise<ApiResponse<Post>> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
};
