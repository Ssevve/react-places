import { render, screen } from '@/tests/utils';
import { BusinessesResultsPagination } from './BusinessesResultsPagination';

describe('BusinessesResultsPagination', () => {
  it('should render correct page count', () => {
    render(<BusinessesResultsPagination currentPage={1} pageCount={3} />);
    expect(screen.getByRole('link', { name: /go to page 3/i })).toBeInTheDocument();
  });
});
