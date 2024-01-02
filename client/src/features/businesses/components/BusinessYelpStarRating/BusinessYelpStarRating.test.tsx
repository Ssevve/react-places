import { render, screen } from '@testing-library/react';
import { BusinessYelpStarRating, BusinessYelpStarRatingProps } from './BusinessYelpStarRating';

const renderBusinessYelpStarRating = ({
  rating = 5,
  reviewCount = 14,
}: Partial<BusinessYelpStarRatingProps>) => {
  return render(<BusinessYelpStarRating rating={rating} reviewCount={reviewCount} />);
};

describe('BusinessYelpStarRating', () => {
  it('should render correct image for 0.5 star rating', () => {
    renderBusinessYelpStarRating({ rating: 0.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_half.png');
  });

  it('should render correct image for full star ratings', () => {
    renderBusinessYelpStarRating({ rating: 2 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_2.png');
  });

  it('should render correct image for decimal ratings above 1', () => {
    renderBusinessYelpStarRating({ rating: 2.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_2_half.png');
  });

  it('should render rating text', () => {
    const expectedRating = 5;
    renderBusinessYelpStarRating({ rating: expectedRating });
    expect(screen.getByText(expectedRating)).toBeInTheDocument();
  });

  it('should render review count', () => {
    const expectedReviewCount = 14;
    renderBusinessYelpStarRating({ rating: expectedReviewCount });
    expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
  });
});
