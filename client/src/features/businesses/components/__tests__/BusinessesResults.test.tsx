import { render, screen } from '@/tests/utils';
import { BusinessesResults, BusinessesResultsProps } from '../BusinessesResults';
import { mockTransformedBusiness } from '@/__mocks__/data';

const renderBusinessesResults = (props?: Partial<BusinessesResultsProps>) => {
  return render(
    <BusinessesResults
      businesses={[mockTransformedBusiness]}
      city="Test"
      currentPage={1}
      openFilters={() => {}}
      pageCount={1}
      {...props}
    />,
  );
};

describe('BusinessesResults', () => {
  it('should render empty list message if businesses has a length of 0', () => {
    renderBusinessesResults({ businesses: [] });
    expect(screen.getByTestId('businesses-empty-list')).toBeInTheDocument();
  });

  it('should render business list if businesses are available', () => {
    renderBusinessesResults();
    expect(screen.getByRole('list', { name: /businesses/i })).toBeInTheDocument();
  });

  it('should render pagination if page count is greater than 1', () => {
    renderBusinessesResults({ pageCount: 2 });
    expect(screen.getByTestId('businesses-pagination')).toBeInTheDocument();
  });

  it('should not render pagination if there are less than two pages of results', () => {
    renderBusinessesResults({ pageCount: 1 });
    expect(screen.queryByTestId('businesses-pagination')).not.toBeInTheDocument();
  });
});
