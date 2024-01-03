import { render, screen } from '@/tests/utils';
import { BusinessCardContactInfo, BusinessCardContactInfoProps } from '.';
import { joinAddress } from './joinAddress';

const contactInfo: BusinessCardContactInfoProps = {
  address: ['Test', 'address', 'Poland'],
  phone: '+48 555 666 777',
  yelpUrl: 'https://www.testUrl.com',
};

const renderBusinessCardContactInfo = (props?: Partial<BusinessCardContactInfoProps>) => {
  return render(<BusinessCardContactInfo {...contactInfo} {...props} />);
};

describe('BusinessCardContactInfo', () => {
  it('should render all contact info', () => {
    renderBusinessCardContactInfo();
    expect(screen.getByText(contactInfo.phone!)).toBeInTheDocument();
    expect(screen.getByText(joinAddress(contactInfo.address))).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', contactInfo.yelpUrl);
  });

  it('should render correct text if "phone" is not available', () => {
    renderBusinessCardContactInfo({ phone: undefined });
    expect(screen.getByText('Not available')).toBeInTheDocument();
  });
});
