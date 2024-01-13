import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

interface AllTheProvidersProps {
  children: React.ReactNode;
  initialEntries: Array<string>;
}

// eslint-disable-next-line react-refresh/only-export-components
const AllTheProviders = ({ children, initialEntries }: AllTheProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries: Array<string>;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  render(ui, {
    wrapper: (args) =>
      AllTheProviders({
        ...args,
        initialEntries: options?.initialEntries || ['/'],
      }),
    ...options,
  });
};

// eslint-disable-next-line react-refresh/only-export-components, import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render };
