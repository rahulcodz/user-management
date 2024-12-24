import { useQuery } from '@tanstack/react-query';
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
