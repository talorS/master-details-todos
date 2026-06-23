import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { defaultQueryOptions } from '../config/queryClient';
import type { User } from '../types/user';

interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useUsers(): UseUsersReturn {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    ...defaultQueryOptions,
  });

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
  };
}
