import { render, screen } from '@/tests/utils';
import { BusinessBaseInfo, BusinessBaseInfoProps } from '.';

const info: BusinessBaseInfoProps = {
  displayIndex: 1,
  isClosed: false,
  name: 'Test Business',
  price: 1,
  rating: 3,
  reviewCount: 17,
};

const renderBusinessBaseInfo = (props?: Partial<BusinessBaseInfoProps>) => {
  return render(<BusinessBaseInfo {...info} {...props} />);
};

describe('BusinessBaseInfo', () => {
  it('should render name with correct displayIndex', () => {
    renderBusinessBaseInfo();
    expect(screen.getByText(`${info.displayIndex}. ${info.name}`)).toBeInTheDocument();
  });

  it('should render <BusinessPriceRating /> component if isClosed is false and price is defined', () => {
    renderBusinessBaseInfo({ isClosed: false, price: 1 });
    expect(screen.getByTestId('business-price-rating')).toBeInTheDocument();
    expect(screen.queryByText('Permanently Closed')).not.toBeInTheDocument();
  });

  it('should not render <BusinessPriceRating /> component if price is not defined', () => {
    renderBusinessBaseInfo({ isClosed: false, price: undefined });
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should render "Permanently Closed" if isClosed is true', () => {
    renderBusinessBaseInfo({ isClosed: true });
    expect(screen.getByText('Permanently Closed')).toBeInTheDocument();
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should render <BusinessYelpStarRating /> component', () => {
    renderBusinessBaseInfo();
    expect(screen.getByText(info.rating)).toBeInTheDocument();
  });
});
