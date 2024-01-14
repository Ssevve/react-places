import { mockTransformedBusiness } from '@/__mocks__';
import { TransformedBusiness } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessesResultsList, BusinessesResultsListProps } from './BusinessesResultsList';

const renderBusinessesResultsList = (props?: Partial<BusinessesResultsListProps>) => {
  Element.prototype.scrollTo = () => {};
  return render(<BusinessesResultsList businesses={[]} {...props} />, {
    initialEntries: ['?city=Warsaw'],
  });
};

describe('BusinessesResultsList', () => {
  it('should render all businesses', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessesResultsList({
      businesses: expectedBusinesses,
    });
    expectedBusinesses.forEach(({ name }) => {
      expect(screen.getByText(name, { exact: false })).toBeInTheDocument();
    });
  });

  it('should show correct message when there are no businesses to show', () => {
    renderBusinessesResultsList({ businesses: [] });
    expect(screen.getByText('Unfortunately, there are no businesses to show.')).toBeInTheDocument();
  });

  it('should render <BusinessesResultsListPagination /> component if needed', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessesResultsList({
      businesses: expectedBusinesses,
    });
    expect(screen.getByLabelText('pagination navigation')).toBeInTheDocument();
  });

  it('should not render <BusinessesResultsListPagination /> component if not needed', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessesResultsList({
      businesses: expectedBusinesses,
    });
    expect(screen.queryByLabelText('pagination navigation')).not.toBeInTheDocument();
  });

  it('should render <BusinessesResultsListSkeleton /> when businesses are undefined', () => {
    renderBusinessesResultsList({ businesses: undefined });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
