import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText(contactInfo.phone)).toBeInTheDocument();
    expect(screen.getByText(joinAddress(contactInfo.address))).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', contactInfo.yelpUrl);
  });
});
