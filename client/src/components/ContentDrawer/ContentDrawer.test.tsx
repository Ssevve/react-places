import { server } from '@/__mocks__/server';
import { createMatchMedia } from '@/tests/createMatchMedia';
import { render, screen, waitFor } from '@/tests/utils';
import { theme } from '@/theme';
import { HttpResponse, http } from 'msw';
import { ContentDrawer } from './ContentDrawer';

const renderContentDrawer = () => {
  return render(<ContentDrawer setCenteredBusinessId={vi.fn()} />);
};

describe('ContentDrawer', () => {
  it('should render <BusinessList /> component on successful businesses fetch', async () => {
    renderContentDrawer();
    await waitFor(() => {
      expect(screen.getByRole('list', { name: /businesses/i })).toBeInTheDocument();
    });
  });

  it('should render <BusinessListErrorFallback /> component on failed businesses fetch', async () => {
    server.use(http.get('http://localhost:5000/yelp', HttpResponse.error));
    renderContentDrawer();
    await waitFor(() => {
      expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
    });
  });

  it('should render <BusinessListSkeleton /> component while fetching businesses data', () => {
    renderContentDrawer();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render <MobileDrawerToggler /> component on mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md - 1);
    renderContentDrawer();
    expect(screen.getByTestId('mobile-drawer-toggler')).toBeInTheDocument();
  });

  it('should not render <MobileDrawerToggler /> component on non-mobile devices', () => {
    window.matchMedia = createMatchMedia(theme.breakpoints.values.md);
    renderContentDrawer();
    expect(screen.queryByTestId('mobile-drawer-toggler')).not.toBeInTheDocument();
  });
});
