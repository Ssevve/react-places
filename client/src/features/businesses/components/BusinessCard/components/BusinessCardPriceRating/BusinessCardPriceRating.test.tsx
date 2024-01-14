import { priceRatings } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessCardPriceRating } from './BusinessCardPriceRating';

const renderBusinessCardPriceRating = (price: number) => {
  return render(<BusinessCardPriceRating price={price} />);
};

const getColoredIcons = (expectedColor: string) => {
  return screen.getAllByTestId('CircleIcon').filter((icon) => icon.getAttribute('color') === expectedColor);
};

describe('BusinessCardPriceRating', () => {
  it('should correctly render price rating', () => {
    const expectedRating = priceRatings[1];
    renderBusinessCardPriceRating(expectedRating.value);
    expect(screen.getByText(expectedRating.label)).toHaveStyle({
      color: expectedRating.color,
    });
    expect(getColoredIcons(expectedRating.color)).toHaveLength(expectedRating.value);
  });
});
