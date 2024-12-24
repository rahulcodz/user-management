import { useQuery } from '@tanstack/react-query';
import { postService } from '@/services/api/posts';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getPost(id),
  });
}
