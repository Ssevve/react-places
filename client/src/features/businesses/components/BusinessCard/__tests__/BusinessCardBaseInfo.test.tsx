import { render, screen } from '@/tests/utils';
import { BusinessCardBaseInfo, BusinessCardBaseInfoProps } from '../BusinessCardBaseInfo';

const business = {
  displayIndex: 1,
  isClosed: false,
  name: 'Test',
  price: 1,
  rating: 2,
  reviewCount: 3,
};

const renderBusinessCardBaseInfo = (props?: Partial<BusinessCardBaseInfoProps>) => {
  return render(<BusinessCardBaseInfo {...business} {...props} />);
};

describe('BusinessCardBaseInfo', () => {
  it('should render name with correct display index', () => {
    renderBusinessCardBaseInfo();
    expect(screen.getByText(`${business.displayIndex}. ${business.name}`)).toBeInTheDocument();
  });

  it('should render yelp rating', () => {
    renderBusinessCardBaseInfo();
    expect(screen.getByTestId('business-card-yelp-rating')).toBeInTheDocument();
  });

  it('should render permanently closed message if business is permanently closed', () => {
    renderBusinessCardBaseInfo({ ...business, isClosed: true });
    expect(screen.getByText(/permanently closed/i)).toBeInTheDocument();
  });

  it('should render price rating if business is not permanently closed', () => {
    renderBusinessCardBaseInfo({ ...business, isClosed: false });
    expect(screen.getByTestId('business-card-price-rating')).toBeInTheDocument();
  });
});
