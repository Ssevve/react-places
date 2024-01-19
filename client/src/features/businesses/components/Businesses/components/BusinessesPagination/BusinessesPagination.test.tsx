import { render, screen } from '@/tests/utils';
import { BusinessesPagination } from './BusinessesPagination';
import { BUSINESSES_PER_PAGE } from '@/features/businesses';

describe('BusinessesPagination', () => {
  it('should render correct amount of links', () => {
    const testBusinessCount = 70;
    const arrowNavigationLinkCount = 2;
    const expectedPageCount = Math.ceil(testBusinessCount / BUSINESSES_PER_PAGE);
    render(<BusinessesPagination currentPage={1} totalBusinesses={testBusinessCount} />);
    expect(screen.getAllByRole('link')).toHaveLength(expectedPageCount + arrowNavigationLinkCount);
  });
});
