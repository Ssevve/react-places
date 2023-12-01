import { render, screen } from '@testing-library/react';
import { BusinessPriceRating } from '.';
import { Price } from '../../api';
import { businessConstraints, priceRatings } from '../../constants';

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

  it('should not render rating if price is less than minimum priceRating', () => {
    renderBusinessPriceRating(businessConstraints.priceRating.min - 1);
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should not render rating if price is greater than maximum priceRating', () => {
    renderBusinessPriceRating(businessConstraints.priceRating.max + 1);
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });
});
