import { priceRatings } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessCardPriceRating, BusinessCardPriceRatingProps } from '../BusinessCardPriceRating';

const renderBusinessCardPriceRating = (props?: Partial<BusinessCardPriceRatingProps>) => {
  return render(<BusinessCardPriceRating price={2} {...props} />);
};

const getColoredIcons = (expectedColor: string) => {
  return screen.getAllByTestId('CircleIcon').filter((icon) => icon.getAttribute('color') === expectedColor);
};

describe('BusinessCardPriceRating', () => {
  it('should correctly render price rating if business is not permanently closed', () => {
    const expectedRating = priceRatings[1];
    renderBusinessCardPriceRating({ price: expectedRating.value });
    expect(screen.getByText(expectedRating.label)).toHaveStyle({
      color: expectedRating.color,
    });
    expect(getColoredIcons(expectedRating.color)).toHaveLength(expectedRating.value);
  });

  it('should not render if price is falsy', () => {
    const { container } = renderBusinessCardPriceRating({ price: 0 });
    expect(container.firstChild).toBeNull();
  });
});
