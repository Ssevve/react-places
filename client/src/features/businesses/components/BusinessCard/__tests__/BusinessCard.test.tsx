import { mockTransformedBusiness as business } from '@/__mocks__/data';
import { render, screen } from '@/tests/utils';
import { BusinessCard, BusinessCardProps } from '../BusinessCard';
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
    renderBusinessCard();
    expect(screen.getByTestId('business-card-image')).toBeInTheDocument();
  });

  it('should render name with correct display index', () => {
    renderBusinessCard();
    expect(screen.getByText(`${business.displayIndex}. ${business.name}`)).toBeInTheDocument();
  });

  it('should render yelp rating', () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-yelp-rating')).toBeInTheDocument();
  });

  it('should render permanently closed message if business is permanently closed', () => {
    renderBusinessCard({ business: { ...business, isClosed: true } });
    expect(screen.getByText(/permanently closed/i)).toBeInTheDocument();
  });

  it('should render price rating if business is not permanently closed', () => {
    renderBusinessCard({ business: { ...business, isClosed: false } });
    expect(screen.getByTestId('business-card-price-rating')).toBeInTheDocument();
  });

  it('should render categories', () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-categories')).toBeInTheDocument();
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
