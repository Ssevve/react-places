import { mockTransformedBusiness as business } from '@/__mocks__';
import { render, screen } from '@/tests/utils';
import { BusinessCard, BusinessCardProps } from '../BusinessCard';
import * as imageExports from '../BusinessCardImage';
import * as priceRatingExports from '../BusinessCardPriceRating';
import * as yelpRatingExports from '../BusinessCardYelpStarRating';
import * as categoriesExports from '../BusinessCardCategories';
import { joinAddress } from '../utils';

const testProps: BusinessCardProps = {
  business,
  isExpanded: false,
  toggleExpanded: vi.fn(),
};

const renderBusinessCard = (props?: Partial<BusinessCardProps>) => {
  return render(<BusinessCard {...testProps} {...props} />);
};

describe('BusinessCard', () => {
  it('should render image', () => {
    vi.spyOn(imageExports, 'BusinessCardImage').mockReturnValue(<div data-testid="image" />);
    renderBusinessCard();
    expect(screen.getByTestId('image')).toBeInTheDocument();
  });

  it('should render name with correct display index', () => {
    renderBusinessCard();
    expect(screen.getByText(`${business.displayIndex}. ${business.name}`)).toBeInTheDocument();
  });

  it('should render yelp rating', () => {
    vi.spyOn(yelpRatingExports, 'BusinessCardYelpStarRating').mockReturnValue(
      <div data-testid="yelp-rating" />,
    );
    renderBusinessCard();
    expect(screen.getByTestId('yelp-rating')).toBeInTheDocument();
  });

  it('should render price rating', () => {
    vi.spyOn(priceRatingExports, 'BusinessCardPriceRating').mockReturnValue(
      <div data-testid="price-rating" />,
    );
    renderBusinessCard();
    expect(screen.getByTestId('yelp-rating')).toBeInTheDocument();
  });

  it('should render categories', () => {
    vi.spyOn(categoriesExports, 'BusinessCardCategories').mockReturnValue(<div data-testid="categories" />);
    renderBusinessCard();
    expect(screen.getByTestId('categories')).toBeInTheDocument();
  });

  it('should render Yelp link for the business', () => {
    renderBusinessCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', business.url);
  });

  it('should render contact info if expanded', async () => {
    renderBusinessCard({ isExpanded: true });
    expect(screen.getByText(business.displayPhone!)).toBeInTheDocument();
    expect(screen.getByText(joinAddress(business.location.displayAddress))).toBeInTheDocument();
  });

  it('should not render contact info if not expanded', async () => {
    renderBusinessCard({ isExpanded: false });
    expect(screen.queryByText(business.displayPhone!)).not.toBeInTheDocument();
    expect(screen.queryByText(joinAddress(business.location.displayAddress))).not.toBeInTheDocument();
  });

  it('should render button to center the business on the map', async () => {
    renderBusinessCard();
    expect(screen.getByRole('button', { name: /show on map/i })).toBeInTheDocument();
  });
});
