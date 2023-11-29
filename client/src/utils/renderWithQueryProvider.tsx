import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

const queryClient = new QueryClient();
export const renderWithQueryProvider = (component: JSX.Element) => {
  render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};
