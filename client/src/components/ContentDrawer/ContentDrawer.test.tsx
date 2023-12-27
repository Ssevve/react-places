import { server } from '@/__mocks__/server';
import { createMatchMedia } from '@/tests/createMatchMedia';
import { render, screen, waitFor } from '@/tests/utils';
import { theme } from '@/theme';
import { HttpResponse, http } from 'msw';
import { ContentDrawer } from './ContentDrawer';

const renderContentDrawer = () => {
  return render(<ContentDrawer setHighlightedBusinessId={vi.fn()} />);
};

describe('ContentDrawer', () => {
  it('should render <CitiesAutocomplete /> component', async () => {
    renderContentDrawer();
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: /select a city/i })).toBeInTheDocument();
    });
  });

  it('should render <BusinessListErrorFallback /> component on failed businesses fetch', async () => {
    server.use(http.get('http://localhost:5000/yelp', HttpResponse.error));
    renderContentDrawer();
    await waitFor(() => {
      expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
    });
  });

  it('should render <Businesses /> component if city has been provided', async () => {
    renderContentDrawer();
    expect(
      screen.getByText(/Please provide a city before we can show recommended places!/i),
    ).toBeInTheDocument();
  });

  it('should render <MobileDrawerToggler /> component on mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    renderContentDrawer();
    expect(screen.getByLabelText(/close drawer/i)).toBeInTheDocument();
  });

  it('should not render <MobileDrawerToggler /> component on non-mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md);
    renderContentDrawer();
    expect(screen.queryByLabelText(/close drawer/i)).not.toBeInTheDocument();
  });
});
