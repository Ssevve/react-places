/* eslint-disable testing-library/no-node-access */
import { mockYelpBusinessesResponse, server } from '@/__mocks__';
import { env } from '@/config/env';
import { render, screen } from '@/tests/utils';
import { HttpResponse, http } from 'msw';
import { Businesses } from './Businesses';
import * as childrenExports from './components';

const renderBusinesses = (city = 'Test') => {
  return render(<Businesses openFilters={() => {}} />, {
    initialEntries: [`/?city=${city}`],
  });
};

describe('Businesses', () => {
  it('should render correct message if city was not selected', () => {
    renderBusinesses('');
    expect(
      screen.getByText('You need to provide a city before we can show any results!'),
    ).toBeInTheDocument();
  });

  it('should render loader when fetching businesses data', () => {
    renderBusinesses();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render <BusinessesErrorFallback /> on error', async () => {
    vi.spyOn(childrenExports, 'BusinessesErrorFallback').mockReturnValue(
      <div data-testid="error-fallback" />,
    );

    server.use(http.get(env.VITE_BUSINESSES_API_URL, HttpResponse.error));

    renderBusinesses();
    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });

  it('should render <BusinessesNoResults /> if empty businesses array was received', async () => {
    vi.spyOn(childrenExports, 'BusinessesNoResults').mockReturnValue(<div data-testid="no-results" />);

    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({ ...mockYelpBusinessesResponse, businesses: [] }),
      ),
    );

    renderBusinesses('Test');
    expect(await screen.findByTestId('no-results')).toBeInTheDocument();
  });

  it('should render <BusinessesResults /> if businesses data was received', async () => {
    vi.spyOn(childrenExports, 'BusinessesResults').mockReturnValue(<div data-testid="results" />);
    renderBusinesses();
    expect(await screen.findByTestId('results')).toBeInTheDocument();
  });
});
