import { priceRatings } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessesFiltersPrice, BusinessesFiltersPriceProps } from './BusinessesFiltersPrice';

const renderBusinessesFiltersPrice = (props?: Partial<BusinessesFiltersPriceProps>) => {
  return render(<BusinessesFiltersPrice setPrices={() => {}} prices={[]} {...props} />);
};

describe('BusinessesFiltersPrice', () => {
  it('should render correct heading', () => {
    renderBusinessesFiltersPrice();
    expect(screen.getByRole('heading', { name: 'Price' })).toBeInTheDocument();
  });

  it('should render checkbox for all price rating options', () => {
    renderBusinessesFiltersPrice();
    expect(screen.getAllByRole('checkbox')).toHaveLength(priceRatings.length);
  });

  it('should render checkboxes with correct initial checked state', () => {
    const expectedCheckedCheckbox = priceRatings[0];
    const expectedUncheckedLength = priceRatings.length - 1;
    renderBusinessesFiltersPrice({ prices: [expectedCheckedCheckbox.value.toString()] });
    expect(screen.getByRole('checkbox', { name: expectedCheckedCheckbox.label })).toBeChecked();
    expect(screen.getAllByRole('checkbox', { checked: false })).toHaveLength(
      expectedUncheckedLength,
    );
  });
});
