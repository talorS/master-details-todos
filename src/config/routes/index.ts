type Route<Path extends string> = {
  path: Path;
  label: string;
};

type DynamicRoute<Path extends string, Params> = Route<Path> & {
  to: (params: Params) => string;
};

type AppRoutes = {
  home: Route<'/'>;
  notFound: Route<'*'>;
  userTodos: DynamicRoute<'users/:userId', { userId: number }>;
};

export const routes = {
  home: {
    path: '/',
    label: 'Home',
  },
  notFound: {
    path: '*',
    label: 'Not Found',
  },
  userTodos: {
    path: 'users/:userId',
    to: ({ userId }: { userId: number }) => `/users/${userId}`,
    label: 'User Todos',
  },
} as const satisfies AppRoutes;
