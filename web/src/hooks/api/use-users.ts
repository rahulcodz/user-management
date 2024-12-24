import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api/users';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getUser(id),
  });
}

export const useNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => userService.registerNewUser(data), // Pass data to the mutation function
    onSuccess: () => {
      // Invalidate the users query so it will refetch the users list after a new user is added
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
