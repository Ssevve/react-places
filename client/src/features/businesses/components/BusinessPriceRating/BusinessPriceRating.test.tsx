import { render, screen } from '@testing-library/react';
import { BusinessPriceRating } from '.';
import { priceRatings } from '../../constants';
import { Price } from '../../types';

const renderBusinessPriceRating = (price: Price) => {
  return render(<BusinessPriceRating price={price} />);
};

const getColoredIcons = (expectedColor: string) => {
  return screen
    .getAllByTestId('CircleIcon')
    .filter((icon) => icon.getAttribute('color') === expectedColor);
};

describe('BusinessPriceRating', () => {
  it('should correctly render price rating', () => {
    const expectedRating = 3;
    const expectedColor = priceRatings[expectedRating].color;
    const expectedLabel = priceRatings[expectedRating].label;
    renderBusinessPriceRating(expectedRating);
    expect(screen.getByText(expectedLabel)).toHaveStyle({
      color: expectedColor,
    });
    expect(getColoredIcons(expectedColor)).toHaveLength(expectedRating);
  });

  it('should not render if price is undefined', () => {
    renderBusinessPriceRating(undefined);
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });
});
