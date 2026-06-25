import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import { defaultQueryOptions } from '../config/queryClient';
import type { User } from '../types/user';
import { unwrapTaskEither } from '../utils/taskEither';

export const usersQueryKey = ['users'] as const;

export const usersQueryFn = () => unwrapTaskEither(fetchUsers());

export const useUsersQuery = () =>
  useQuery<ReadonlyArray<User>, Error>({
    queryKey: usersQueryKey,
    queryFn: usersQueryFn,
    ...defaultQueryOptions,
  });
