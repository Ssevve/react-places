import { render, screen } from '@/tests/utils';
import { BusinessListPagination, BusinessListPaginationProps } from './BusinessListPagination';

const renderBusinessListPagination = (props?: Partial<BusinessListPaginationProps>) => {
  return render(
    <BusinessListPagination businessesPerPage={1} currentPage={1} totalBusinesses={3} {...props} />,
  );
};

describe('BusinessListPagination', () => {
  it('should render correct page count', () => {
    renderBusinessListPagination({ businessesPerPage: 1, totalBusinesses: 3 });
    expect(screen.getByRole('link', { name: /go to page 3/i })).toBeInTheDocument();
  });

  it('should not render if page count is less than 2', () => {
    renderBusinessListPagination({ businessesPerPage: 1, totalBusinesses: 1 });
    expect(screen.queryByLabelText('pagination navigation')).not.toBeInTheDocument();
  });
});
