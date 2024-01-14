import { server } from '@/__mocks__';
import { render, screen, waitFor } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { BusinessesDrawer } from './BusinessesDrawer';

const renderBusinessesDrawer = (initialEntries: Array<string> = ['/']) => {
  return render(<BusinessesDrawer />, { initialEntries });
};

describe('BusinessesDrawer', () => {
  it('should render <CitiesAutocomplete /> component', () => {
    renderBusinessesDrawer();
    expect(screen.getByRole('combobox', { name: 'Select a city' })).toBeInTheDocument();
  });

  it('should render <BusinessesErrorFallback /> component on failed businesses fetch', async () => {
    server.use(http.get('http://localhost:5000/yelp', HttpResponse.error));
    renderBusinessesDrawer();
    await waitFor(() => {
      expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
    });
  });

  it('should render <Businesses /> component', () => {
    renderBusinessesDrawer();
    expect(
      screen.getByText('You need to provide a city before we can show recommended places!'),
    ).toBeInTheDocument();
  });

  it('should render "filters button" after successful fetch', async () => {
    renderBusinessesDrawer(['/?city=Warsaw']);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Filters' })).toBeInTheDocument();
    });
  });

  it('should show filters on "filters button" click', async () => {
    const user = userEvent.setup();
    renderBusinessesDrawer(['/?city=Warsaw']);

    await waitFor(async () => {
      const filtersButton = screen.getByRole('button', { name: 'Filters' });
      await user.click(filtersButton);
    });

    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
  });
});
