import { mockTransformedBusiness } from '@/__mocks__';
import { render, screen } from '@/tests/utils';
import * as filtersExports from '../BusinessesFilters';
import * as listExports from '../BusinessesList';
import * as paginationExports from '../BusinessesPagination';
import { BusinessesResults, BusinessesResultsProps } from '../BusinessesResults';

const renderBusinessesResults = (props?: Partial<BusinessesResultsProps>) => {
  const businesses = [mockTransformedBusiness];
  return render(
    <BusinessesResults
      businesses={businesses}
      openFilters={() => {}}
      totalBusinesses={businesses.length}
      {...props}
    />,
  );
};

describe('BusinessesResults', () => {
  it('should render businesses list', () => {
    vi.spyOn(listExports, 'BusinessesList').mockReturnValue(<div data-testid="list" />);
    renderBusinessesResults();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('should render pagination', () => {
    vi.spyOn(paginationExports, 'BusinessesPagination').mockReturnValue(<div data-testid="pagination" />);
    renderBusinessesResults();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render filters opener button', () => {
    vi.spyOn(filtersExports, 'BusinessesFiltersOpener').mockReturnValue(<div data-testid="filters-opener" />);
    renderBusinessesResults();
    expect(screen.getByTestId('filters-opener')).toBeInTheDocument();
  });
});
