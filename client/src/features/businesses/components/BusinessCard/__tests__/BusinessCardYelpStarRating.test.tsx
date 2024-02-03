import { render, screen } from '@/tests/utils';
import { BusinessCardYelpStarRating, BusinessCardYelpStarRatingProps } from '../BusinessCardYelpStarRating';

const renderBusinessCardYelpStarRating = ({
  rating = 5,
  reviewCount = 14,
}: Partial<BusinessCardYelpStarRatingProps>) => {
  return render(<BusinessCardYelpStarRating rating={rating} reviewCount={reviewCount} />);
};

describe('BusinessCardYelpStarRating', () => {
  it('should render correct image for 0.5 star rating', () => {
    renderBusinessCardYelpStarRating({ rating: 0.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('half.png');
  });

  it('should render correct image for full star ratings', () => {
    renderBusinessCardYelpStarRating({ rating: 2 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('2.png');
  });

  it('should render correct image for decimal ratings above 1', () => {
    renderBusinessCardYelpStarRating({ rating: 2.5 });
    expect((screen.getByRole('img') as HTMLImageElement).src).toContain('2_half.png');
  });

  it('should render rating text', () => {
    const expectedRating = 5;
    renderBusinessCardYelpStarRating({ rating: expectedRating });
    expect(screen.getByText(expectedRating)).toBeInTheDocument();
  });

  it('should render correct alt text for 1 star', () => {
    renderBusinessCardYelpStarRating({ rating: 1 });
    expect(screen.getByAltText(/yelp 1 star/i)).toBeInTheDocument();
  });

  it('should render correct alt text for more than 1 star', () => {
    renderBusinessCardYelpStarRating({ rating: 2 });
    expect(screen.getByAltText(/yelp 2 stars/i)).toBeInTheDocument();
  });

  it('should render review count', () => {
    const expectedReviewCount = 14;
    renderBusinessCardYelpStarRating({ rating: expectedReviewCount });
    expect(screen.getByText(expectedReviewCount)).toBeInTheDocument();
  });
});
