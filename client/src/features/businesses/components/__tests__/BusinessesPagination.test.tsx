import { render, screen } from '@/tests/utils';
import { BusinessesPagination } from '../BusinessesPagination';

describe('BusinessesPagination', () => {
  it('should render correct amount of page links', () => {
    const arrowNavigationLinkCount = 2;
    const testPageCount = 3;
    render(<BusinessesPagination currentPage={1} pageCount={testPageCount} />);
    expect(screen.getAllByRole('link')).toHaveLength(testPageCount + arrowNavigationLinkCount);
  });
});
