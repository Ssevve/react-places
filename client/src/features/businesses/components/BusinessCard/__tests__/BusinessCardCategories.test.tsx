import { render, screen } from '@/tests/utils';
import { BusinessCardCategories, BusinessCardCategoriesProps } from '../BusinessCardCategories';

const renderBusinessCardCategories = (props?: Partial<BusinessCardCategoriesProps>) => {
  return render(<BusinessCardCategories categories={[]} {...props} />);
};

describe('BusinessCardCategories', () => {
  it('should render all categories', () => {
    const expectedCategories = [{ title: 'english' }, { title: 'breakfast' }];
    renderBusinessCardCategories({ categories: expectedCategories });
    expectedCategories.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should not render if categories array are not available', () => {
    const { container } = renderBusinessCardCategories({ categories: [] });
    expect(container.firstChild).toBeNull();
  });
});
