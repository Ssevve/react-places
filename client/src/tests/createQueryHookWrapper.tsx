import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export interface CreateQueryHookWrapperProps extends React.PropsWithChildren {
  initialEntries?: Array<string>;
}

export const createQueryHookWrapper = ({
  children,
  initialEntries = ['/'],
}: CreateQueryHookWrapperProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};
