import { render, screen } from '@/tests/utils';
import { BusinessCardCategories, BusinessCardCategoriesProps } from '../BusinessCardCategories';

const renderBusinessCardCategories = (props?: Partial<BusinessCardCategoriesProps>) => {
  return render(<BusinessCardCategories categories={[]} {...props} />);
};

describe('BusinessCardCategories', () => {
  it('should render all categories', () => {
    const expectedCategories = ['english', 'breakfast'];
    renderBusinessCardCategories({ categories: expectedCategories });
    expectedCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should not render if categories array are not available', () => {
    const { container } = renderBusinessCardCategories({ categories: [] });
    expect(container).toBeEmptyDOMElement();
  });
});
