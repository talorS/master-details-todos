import { QueryClient } from '@tanstack/react-query';

export const defaultQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...defaultQueryOptions,
      refetchOnWindowFocus: false,
    },
  },
});
