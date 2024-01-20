import { render, screen } from '@/tests/utils';
import * as filtersExports from '../BusinessesFilters';
import { BusinessesNoResults, BusinessesNoResultsProps } from '../BusinessesNoResults';

const renderBusinessesNoResults = (props?: Partial<BusinessesNoResultsProps>) => {
  return render(<BusinessesNoResults openFilters={() => {}} city="Test" {...props} />);
};

describe('BusinessesNoResults', () => {
  it('should render correct message', () => {
    const expectedCity = 'London';
    renderBusinessesNoResults({ city: 'London' });
    expect(screen.getByText(`No results for ${expectedCity}?`)).toBeInTheDocument();
  });

  it('should render filters opener button', () => {
    vi.spyOn(filtersExports, 'BusinessesFiltersOpener').mockReturnValue(<div data-testid="filters-opener" />);
    renderBusinessesNoResults();
    expect(screen.getAllByTestId('filters-opener').length).toBeGreaterThan(0);
  });
});
