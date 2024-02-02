import { Home, Error } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    element: <Home />,
    errorElement: <Error />,
    index: true,
  },
];

export const router = createBrowserRouter(routes);
