import { server } from '@/__mocks__/server';
import { createMatchMedia } from '@/tests/createMatchMedia';
import { render, screen, waitFor } from '@/tests/utils';
import { theme } from '@/theme';
import { HttpResponse, http } from 'msw';
import { BusinessesDrawer } from './BusinessesDrawer';

const renderBusinessesDrawer = () => {
  return render(<BusinessesDrawer setHighlightedBusinessId={vi.fn()} />);
};

describe('BusinessesDrawer', () => {
  it('should render <CitiesAutocomplete /> component', async () => {
    renderBusinessesDrawer();
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: /select a city/i })).toBeInTheDocument();
    });
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
      screen.getByText(/You need to provide a city before we can show recommended places!/i),
    ).toBeInTheDocument();
  });

  it('should render <MobileDrawerToggler /> component on mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    renderBusinessesDrawer();
    expect(screen.getByLabelText(/close drawer/i)).toBeInTheDocument();
  });

  it('should not render <MobileDrawerToggler /> component on non-mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md);
    renderBusinessesDrawer();
    expect(screen.queryByLabelText(/close drawer/i)).not.toBeInTheDocument();
  });
});
