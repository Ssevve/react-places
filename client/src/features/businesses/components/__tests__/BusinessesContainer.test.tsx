/* eslint-disable testing-library/no-node-access */
import { mockYelpBusinessesResponse, server } from '@/__mocks__';
import { env } from '@/config/env';
import { render, screen } from '@/tests/utils';
import { HttpResponse, http } from 'msw';
import { BusinessesContainer } from '../BusinessesContainer';
import * as errorFallbackExports from '../BusinessesErrorFallback';
import * as noResultsExports from '../BusinessesNoResults';
import * as resultsExports from '../BusinessesResults';

const renderBusinessesContainer = (city = 'Test') => {
  return render(<BusinessesContainer openFilters={() => {}} />, {
    initialEntries: [`/?city=${city}`],
  });
};

describe('BusinessesContainer', () => {
  it('should render correct message if city was not selected', () => {
    renderBusinessesContainer('');
    expect(
      screen.getByText('You need to provide a city before we can show any results!'),
    ).toBeInTheDocument();
  });

  it('should render loader when fetching BusinessesContainer data', () => {
    renderBusinessesContainer();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error fallback on error', async () => {
    vi.spyOn(errorFallbackExports, 'BusinessesErrorFallback').mockReturnValue(
      <div data-testid="error-fallback" />,
    );

    server.use(http.get(env.VITE_BUSINESSES_API_URL, HttpResponse.error));

    renderBusinessesContainer();
    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });

  it('should render no results on empty businesses list', async () => {
    vi.spyOn(noResultsExports, 'BusinessesNoResults').mockReturnValue(<div data-testid="no-results" />);

    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({ ...mockYelpBusinessesResponse, businesses: [] }),
      ),
    );

    renderBusinessesContainer('Test');
    expect(await screen.findByTestId('no-results')).toBeInTheDocument();
  });

  it('should render results if successfully received data', async () => {
    vi.spyOn(resultsExports, 'BusinessesResults').mockReturnValue(<div data-testid="results" />);
    renderBusinessesContainer();
    expect(await screen.findByTestId('results')).toBeInTheDocument();
  });
});
