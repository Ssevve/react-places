import { mockYelpBusinessesResponse } from '@/__mocks__/data';
import { server } from '@/__mocks__/server';
import { env } from '@/config/env';
import { render, screen } from '@/tests/utils';
import { HttpResponse, http } from 'msw';
import { BUSINESSES_PER_PAGE } from '../..';
import { BusinessesContainer } from '../BusinessesContainer';

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

  it('should render loader when fetching BusinessesContainer data', () => {
    renderBusinessesContainer();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render correct message with try again button on error', async () => {
    server.use(http.get(env.VITE_BUSINESSES_API_URL, HttpResponse.error));

    renderBusinessesContainer();
    expect(await screen.findByText("Couldn't load businesses. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should render correct message if no businesses are available', async () => {
    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({ ...mockYelpBusinessesResponse, businesses: [], total: 0 }),
      ),
    );
    const expectedCity = 'London';
    renderBusinessesContainer({ city: expectedCity });
    expect(await screen.findByText(`No results for ${expectedCity}?`)).toBeInTheDocument();
  });

  it('should render business list if businesses are available', async () => {
    renderBusinessesContainer();
    expect(await screen.findByRole('list', { name: /businesses/i })).toBeInTheDocument();
  });

  it('should render pagination if there is more than one page of results', async () => {
    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({
          ...mockYelpBusinessesResponse,
          total: BUSINESSES_PER_PAGE * 2,
        }),
      ),
    );
    renderBusinessesContainer();
    expect(await screen.findByTestId('businesses-pagination')).toBeInTheDocument();
  });

  it('should not render pagination if there are less than two pages of results', async () => {
    server.use(
      http.get(env.VITE_BUSINESSES_API_URL, () =>
        HttpResponse.json({
          ...mockYelpBusinessesResponse,
          total: BUSINESSES_PER_PAGE,
        }),
      ),
    );
    renderBusinessesContainer();
    await screen.findByRole('list', { name: /businesses/i });
    expect(screen.queryByTestId('businesses-pagination')).not.toBeInTheDocument();
  });
});
