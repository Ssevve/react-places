import { Home, NotFound } from '@/pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Home />,
    errorElement: <NotFound />,
    index: true,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
