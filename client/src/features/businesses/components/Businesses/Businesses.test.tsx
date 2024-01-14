/* eslint-disable testing-library/no-node-access */
import { mockYelpBusinessesResponse, server } from '@/__mocks__';
import { env } from '@/config/env';
import { render, screen, waitFor } from '@/tests/utils';
import { HttpResponse, http } from 'msw';
import { Businesses } from './Businesses';

const renderBusinesses = (city = 'Test') => {
  return render(<Businesses openFilters={vi.fn()} />, {
    initialEntries: [`/?city=${city}`],
  });
};

const noCityMessage = 'You need to provide a city before we can show any results!';

describe('Businesses', () => {
  it('should render correct message if city was not provided', () => {
    renderBusinesses('');
    expect(screen.getByText(noCityMessage)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render loader when fetching businesses data', () => {
    renderBusinesses();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText(noCityMessage)).not.toBeInTheDocument();
  });

  it('should render <BusinessesErrorFallback /> component on error', async () => {
    server.use(http.get(env.VITE_BUSINESSES_API_URL, HttpResponse.error));
    renderBusinesses();
    await waitFor(() => {
      expect(screen.getByText('No results for Test?')).toBeInTheDocument();
    });
    expect(screen.queryByText(noCityMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render <BusinessesNoResults /> component if empty businesses array was received', async () => {
    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({ ...mockYelpBusinessesResponse, businesses: [] }),
      ),
    );
    renderBusinesses('Test');
    await waitFor(() => {
      expect(screen.getByText('No results for Test?')).toBeInTheDocument();
    });
    expect(screen.queryByText(noCityMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render <BusinessesResults /> if businesses data was received', async () => {
    renderBusinesses();
    await waitFor(() => {
      expect(screen.getByRole('list', { name: /businesses/i })).toBeInTheDocument();
    });
    expect(screen.queryByText(noCityMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
