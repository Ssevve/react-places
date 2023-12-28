import { mockTransformedBusiness } from '@/__mocks__';
import { render, screen } from '@/tests/utils';
import { TransformedBusiness } from '../../types';
import { BusinessList, BusinessListProps } from './BusinessList';

const renderBusinessList = (props?: Partial<BusinessListProps>) => {
  const emptyFunction = () => {};
  Element.prototype.scrollTo = () => {};
  return render(
    <BusinessList
      setHighlightedBusinessId={emptyFunction}
      toggleDrawer={emptyFunction}
      businesses={undefined}
      currentPage={1}
      totalBusinesses={0}
      {...props}
    />,
    {
      initialEntries: ['?city=Warsaw'],
    },
  );
};

describe('BusinessList', () => {
  it('should render all businesses', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessList({
      businesses: expectedBusinesses,
      totalBusinesses: expectedBusinesses.length,
    });
    expectedBusinesses.forEach(({ name }) => {
      expect(screen.getByText(name, { exact: false })).toBeInTheDocument();
    });
  });

  it('should show correct message when there are no businesses to show', () => {
    renderBusinessList({ businesses: [] });
    expect(screen.getByText('Unfortunately, there are no businesses to show.')).toBeInTheDocument();
  });

  it('should render <BusinessListPagination /> component if needed', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessList({
      businesses: expectedBusinesses,
      totalBusinesses: 200,
    });
    expect(screen.getByLabelText('pagination navigation')).toBeInTheDocument();
  });

  it('should not render <BusinessListPagination /> component if not needed', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    renderBusinessList({
      businesses: expectedBusinesses,
      totalBusinesses: expectedBusinesses.length,
    });
    expect(screen.queryByLabelText('pagination navigation')).not.toBeInTheDocument();
  });

  it('should render <BusinessListSkeleton /> when businesses are undefined', () => {
    renderBusinessList({ businesses: undefined });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
