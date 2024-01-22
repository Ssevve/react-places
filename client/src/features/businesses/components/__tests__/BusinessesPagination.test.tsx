import { render, screen } from '@/tests/utils';
import { BUSINESSES_PER_PAGE } from '../../constants';
import { BusinessesPagination } from '../BusinessesPagination';

describe('BusinessesPagination', () => {
  it('should render correct amount of page links', () => {
    const expectedPageCount = 3;
    const arrowNavigationLinkCount = 2;
    const testBusinessCount = BUSINESSES_PER_PAGE * expectedPageCount;
    render(<BusinessesPagination currentPage={1} totalBusinesses={testBusinessCount} />);
    expect(screen.getAllByRole('link')).toHaveLength(expectedPageCount + arrowNavigationLinkCount);
  });

  it('should not render if page count is less than 2', () => {
    const testBusinessCount = BUSINESSES_PER_PAGE;
    const { container } = render(
      <BusinessesPagination currentPage={1} totalBusinesses={testBusinessCount} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
