import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesFilters, BusinessesFiltersProps } from '../BusinessesFilters';

const renderBusinessesFilters = (props?: Partial<BusinessesFiltersProps>) => {
  return render(<BusinessesFilters close={() => {}} isOpen={true} {...props} />);
};

describe('BusinessesFilters', () => {
  it('should render close button', () => {
    renderBusinessesFilters();
    expect(screen.getByRole('button', { name: /close filters/i })).toBeInTheDocument();
  });

  it('should call "close" prop on close button click', async () => {
    const user = userEvent.setup();
    const mockClose = vi.fn();
    renderBusinessesFilters({ close: mockClose });
    await user.click(screen.getByRole('button', { name: /close filters/i }));
    expect(mockClose).toHaveBeenCalledOnce();
  });

  it('should render correct heading', () => {
    renderBusinessesFilters();
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
  });

  it('should render price filters', () => {
    renderBusinessesFilters();
    expect(screen.getByTestId('price-filter')).toBeInTheDocument();
  });

  it('should render radius filter', () => {
    renderBusinessesFilters();
    expect(screen.getByTestId('radius-filter')).toBeInTheDocument();
  });

  it('should render a button to set selected filters', () => {
    renderBusinessesFilters();
    expect(screen.getByRole('button', { name: 'Set Filters' })).toBeInTheDocument();
  });
});
