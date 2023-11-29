import { render, screen } from '@testing-library/react';
import { BusinessBaseInfo, BusinessBaseInfoProps } from '.';

const testInfo: BusinessBaseInfoProps = {
  index: 1,
  isClosed: false,
  name: 'Test Business',
  price: '$',
  rating: 3,
  reviewCount: 17,
};

const renderBusinessBaseInfo = (props?: Partial<BusinessBaseInfoProps>) => {
  return render(<BusinessBaseInfo {...testInfo} {...props} />);
};

describe('BusinessBaseInfo', () => {
  it('should render name with correct index', () => {
    renderBusinessBaseInfo();
    expect(screen.getByText(`${testInfo.index}. ${testInfo.name}`)).toBeInTheDocument();
  });

  it('should render <BusinessPriceRating /> component if isClosed is false', () => {
    renderBusinessBaseInfo({ isClosed: false });
    expect(screen.getByTestId('business-price-rating')).toBeInTheDocument();
    expect(screen.queryByText('Permanently Closed')).not.toBeInTheDocument();
  });

  it('should render "Permanently Closed" if isClosed is true', () => {
    renderBusinessBaseInfo({ isClosed: true });
    expect(screen.getByText('Permanently Closed')).toBeInTheDocument();
    expect(screen.queryByTestId('business-price-rating')).not.toBeInTheDocument();
  });

  it('should render <BusinessYelpRating /> component', () => {
    renderBusinessBaseInfo();
    expect(screen.getByText(testInfo.rating)).toBeInTheDocument();
  });
});
