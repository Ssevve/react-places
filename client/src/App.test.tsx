import { App } from '@/App';
import { server } from '@/__mocks__/server';
import { createReactQueryWrapper } from '@/tests';
import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

const renderApp = () => {
  return render(<App />, { wrapper: createReactQueryWrapper() });
};

describe('App', () => {
  it('should render <Map /> component', () => {
    renderApp();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render <BusinessList /> component failed businesses fetch', async () => {
    renderApp();
    await waitFor(() => {
      expect(screen.getByRole('list', { name: /businesses/i })).toBeInTheDocument();
    });

    expect(screen.queryByText("Couldn't load businesses")).not.toBeInTheDocument();
  });

  it('should render <BusinessListErrorFallback /> on failed businesses fetch', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    server.use(http.get('http://localhost:5000/yelp', HttpResponse.error));

    renderApp();

    await waitFor(() => {
      expect(screen.getByText("Couldn't load businesses")).toBeInTheDocument();
    });

    expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
  });
});
