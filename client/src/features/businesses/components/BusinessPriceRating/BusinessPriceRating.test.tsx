import { render, screen } from '@/tests/utils';
import { priceRatings } from '../../constants';
import { BusinessPriceRating } from './BusinessPriceRating';

const renderBusinessPriceRating = (price: number) => {
  return render(<BusinessPriceRating price={price} />);
};

const getColoredIcons = (expectedColor: string) => {
  return screen
    .getAllByTestId('CircleIcon')
    .filter((icon) => icon.getAttribute('color') === expectedColor);
};

describe('BusinessPriceRating', () => {
  it('should correctly render price rating', () => {
    const expectedRating = priceRatings[1];
    renderBusinessPriceRating(expectedRating.value);
    expect(screen.getByText(expectedRating.label)).toHaveStyle({
      color: expectedRating.color,
    });
    expect(getColoredIcons(expectedRating.color)).toHaveLength(expectedRating.value);
  });
});
