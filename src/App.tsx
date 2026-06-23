import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import { routes } from './config/routes';
import { SidePanel } from './pages/SidePanel/SidePanel';
import { Home } from './pages/Home/Home';
import { UserTodosPage } from './pages/UserTodos/UserTodos';
import { ErrorFallback } from './pages/Error/Error';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { NotFound } from './pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: routes.home.path,
    element: <SidePanel />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.userTodos.path,
        element: <UserTodosPage />,
      },
    ],
  },
  {
    path: routes.notFound.path,
    element: <NotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={1000}
        closeButton={false}
        hideProgressBar
        position="bottom-right"
      />
    </QueryClientProvider>
  );
}

export default App;
