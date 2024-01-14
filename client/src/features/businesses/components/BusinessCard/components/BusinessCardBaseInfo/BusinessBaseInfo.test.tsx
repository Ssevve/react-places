import { render, screen } from '@/tests/utils';
import { BusinessCardBaseInfo, BusinessCardBaseInfoProps } from './BusinessCardBaseInfo';

const info: BusinessCardBaseInfoProps = {
  displayIndex: 1,
  isClosed: false,
  name: 'Test Business',
  price: 1,
  rating: 3,
  reviewCount: 17,
};

const renderBusinessCardBaseInfo = (props?: Partial<BusinessCardBaseInfoProps>) => {
  return render(<BusinessCardBaseInfo {...info} {...props} />);
};

describe('BusinessCardBaseInfo', () => {
  it('should render name with correct displayIndex', () => {
    renderBusinessCardBaseInfo();
    expect(screen.getByText(`${info.displayIndex}. ${info.name}`)).toBeInTheDocument();
  });

  it('should render <BusinessPriceRating /> component if isClosed is false and price is defined', () => {
    renderBusinessCardBaseInfo({ isClosed: false, price: 1 });
    expect(screen.getByTestId('business-price-rating')).toBeInTheDocument();
    expect(screen.queryByText('Permanently Closed')).not.toBeInTheDocument();
  });

  it('should not render <BusinessPriceRating /> component if price is not defined', () => {
    renderBusinessCardBaseInfo({ isClosed: false, price: undefined });
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should render "Permanently Closed" if isClosed is true', () => {
    renderBusinessCardBaseInfo({ isClosed: true });
    expect(screen.getByText('Permanently Closed')).toBeInTheDocument();
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should render <BusinessYelpStarRating /> component', () => {
    renderBusinessCardBaseInfo();
    expect(screen.getByText(info.rating)).toBeInTheDocument();
  });
});
