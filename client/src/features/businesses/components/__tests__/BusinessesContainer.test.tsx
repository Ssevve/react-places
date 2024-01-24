import { render, screen } from '@/tests/utils';
import { BusinessesContainer } from '../BusinessesContainer';
import { server } from '@/__mocks__/server';
import { HttpResponse, http } from 'msw';
import { env } from '@/config/env';

const renderBusinessesContainer = ({ city = 'Test' } = {}) => {
  return render(<BusinessesContainer openFilters={() => {}} />, {
    initialEntries: [`/?city=${city}`],
  });
};

describe('BusinessesContainer', () => {
  it('should render correct message if city was not selected', () => {
    renderBusinessesContainer({ city: '' });
    expect(
      screen.getByText('You need to provide a city before we can show any results!'),
    ).toBeInTheDocument();
  });

  it('should render loader when fetching data', () => {
    renderBusinessesContainer();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render results on successful fetch', async () => {
    renderBusinessesContainer();
    expect(await screen.findByTestId('businesses-results')).toBeInTheDocument();
  });

  it('should render error message on error', async () => {
    server.use(http.get(env.VITE_BUSINESSES_API_URL, HttpResponse.error));
    renderBusinessesContainer();
    expect(await screen.findByTestId('businesses-fetch-error')).toBeInTheDocument();
  });
});
