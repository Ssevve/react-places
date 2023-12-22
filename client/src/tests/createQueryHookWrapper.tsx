import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const createQueryHookWrapper = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
