import { render, screen } from '@testing-library/react';
import { BusinessYelpRating, BusinessYelpRatingProps } from '.';

const renderBusinessYelpRating = ({
  rating = 5,
  reviewCount = 14,
}: Partial<BusinessYelpRatingProps>) => {
  return render(<BusinessYelpRating rating={rating} reviewCount={reviewCount} />);
};

describe('BusinessYelpRating', () => {
  it('should render correct image for 0.5 star rating', () => {
    renderBusinessYelpRating({ rating: 0.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_half.png');
  });

  it('should render correct image for full star ratings', () => {
    renderBusinessYelpRating({ rating: 2 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_2.png');
  });

  it('should render correct image for decimal ratings above 1', () => {
    renderBusinessYelpRating({ rating: 2.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('regular_2_half.png');
  });

  it('should render rating text', () => {
    const expectedRating = 5;
    renderBusinessYelpRating({ rating: expectedRating });
    expect(screen.getByText(expectedRating)).toBeInTheDocument();
  });

  it('should render review count', () => {
    const expectedReviewCount = 14;
    renderBusinessYelpRating({ rating: expectedReviewCount });
    expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
  });
});
