import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesDrawerControls, BusinessesDrawerControlsProps } from '../BusinessesDrawerControls';

const renderBusinessesDrawerControls = (props?: Partial<BusinessesDrawerControlsProps>) => {
  return render(
    <BusinessesDrawerControls
      isFetchInitialized={false}
      isSearchDisabled={false}
      resetSearch={() => {}}
      fetchBusinesses={() => {}}
      openFilters={() => {}}
      {...props}
    />,
  );
};

describe('BusinessesDrawerControls', () => {
  it('should render not disabled city autocomplete input if fetch is not initialized', () => {
    renderBusinessesDrawerControls({ isFetchInitialized: false });
    expect(screen.getByTestId('cities-autocomplete-input')).not.toBeDisabled();
  });

  it('should render disabled city autocomplete input if fetch is initialized', () => {
    renderBusinessesDrawerControls({ isFetchInitialized: true });
    expect(screen.getByTestId('cities-autocomplete-input')).toBeDisabled();
  });

  it('should render filters opener', () => {
    renderBusinessesDrawerControls();
    expect(screen.getByTestId('businesses-filters-opener')).toBeInTheDocument();
  });

  it('should call "openFilters" props on filters opener click', async () => {
    const user = userEvent.setup();
    const mockOpenFilters = vi.fn();
    renderBusinessesDrawerControls({ openFilters: mockOpenFilters });
    const filtersButton = await screen.findByTestId('businesses-filters-opener');
    await user.click(filtersButton);
    expect(mockOpenFilters).toHaveBeenCalledOnce();
  });

  it('should render businesses sort select input', () => {
    renderBusinessesDrawerControls();
    expect(screen.getByTestId('businesses-sort-select')).toBeInTheDocument();
  });

  it('should render businesses fetch trigger button', () => {
    renderBusinessesDrawerControls();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should fetch businesses on fetch trigger button click', async () => {
    const user = userEvent.setup();
    const mockFetchBusinesses = vi.fn();
    renderBusinessesDrawerControls({ fetchBusinesses: mockFetchBusinesses });
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(mockFetchBusinesses).toHaveBeenCalledOnce();
  });
});
