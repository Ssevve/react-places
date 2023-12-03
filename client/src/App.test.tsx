import { App } from '@/App';
import { server } from '@/__mocks__/server';
import { renderWithQueryProvider } from '@/utils/renderWithQueryProvider';
import { screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

describe('App', () => {
  it('should render <Map /> component', () => {
    renderWithQueryProvider(<App />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render <BusinessList /> component failed businesses fetch', async () => {
    renderWithQueryProvider(<App />);

    await waitFor(() => {
      expect(screen.getByRole('list', { name: /business list/i })).toBeInTheDocument();
    });

    expect(screen.queryByText("Couldn't load businesses")).not.toBeInTheDocument();
  });

  it('should render <BusinessListErrorFallback /> on failed businesses fetch', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    server.use(http.get('http://localhost:5000/yelp', HttpResponse.error));
    renderWithQueryProvider(<App />);

    await waitFor(() => {
      expect(screen.getByText("Couldn't load businesses")).toBeInTheDocument();
    });

    expect(screen.queryByRole('list', { name: /business list/i })).not.toBeInTheDocument();
  });
});
