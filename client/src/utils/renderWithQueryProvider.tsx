import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
export const renderWithQueryProvider = (component: JSX.Element) => {
  render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};
