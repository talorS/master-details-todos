import { useUsersQuery } from '../queries/users';
import type { User } from '../types/user';

interface UseUsersReturn {
  users: ReadonlyArray<User>;
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
  } = useUsersQuery();

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
  };
}
