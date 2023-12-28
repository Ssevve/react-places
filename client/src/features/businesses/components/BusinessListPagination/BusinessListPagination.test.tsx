import { render, screen } from '@/tests/utils';
import { BusinessListPagination } from './BusinessListPagination';

describe('BusinessListPagination', () => {
  it('should render correct page count', () => {
    render(<BusinessListPagination currentPage={1} pageCount={3} />);
    expect(screen.getByRole('link', { name: /go to page 3/i })).toBeInTheDocument();
  });
});
