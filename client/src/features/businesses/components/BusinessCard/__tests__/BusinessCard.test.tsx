import { mockTransformedBusiness as business } from '@/__mocks__/data';
import { render, screen } from '@/tests/utils';
import { BusinessCard, BusinessCardProps } from '../BusinessCard';
import { joinAddress } from '../utils';

const testProps: BusinessCardProps = {
  business,
  isExpanded: false,
  toggleExpandedBusiness: vi.fn(),
};

const renderBusinessCard = (props?: Partial<BusinessCardProps>) => {
  return render(<BusinessCard {...testProps} {...props} />);
};

describe('BusinessCard', () => {
  it('should render image', () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-image')).toBeInTheDocument();
  });

  it('should render base info', () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-base-info')).toBeInTheDocument();
  });

  it('should render categories', () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-categories')).toBeInTheDocument();
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

  it('should render card actions', async () => {
    renderBusinessCard();
    expect(screen.getByTestId('business-card-actions')).toBeInTheDocument();
  });
});
