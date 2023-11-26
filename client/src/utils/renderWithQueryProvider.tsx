import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const renderWithQueryProvider = (component: JSX.Element) => {
  const queryClient = new QueryClient();
  render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};
