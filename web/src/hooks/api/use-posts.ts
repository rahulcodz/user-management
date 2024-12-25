import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/api/posts';

export function usePosts() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: postService.getPosts,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postService.getPost(id),
  });
}

export const useNewTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => postService.registerNewTask(data), // Pass data to the mutation function
    onSuccess: () => {
      // Invalidate the users query so it will refetch the users list after a new user is added
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
