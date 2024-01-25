import { render, screen } from '@/tests/utils';
import { BusinessCardActions, BusinessCardActionsProps } from '../BusinessCardActions';

const renderBusinessCardActions = (props?: Partial<BusinessCardActionsProps>) => {
  return render(
    <BusinessCardActions
      isContactExpanded={false}
      name="Test"
      toggleExpandedContact={() => {}}
      yelpUrl="test.com"
      {...props}
    />,
  );
};

describe('BusinessCardActions', () => {
  it('should render button to center the business on the map', () => {
    renderBusinessCardActions();
    expect(screen.getByRole('button', { name: /show on map/i })).toBeInTheDocument();
  });

  it('should render button to expand contact info', () => {
    renderBusinessCardActions();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });

  it('should render Yelp link for the business', () => {
    const expectedUrl = 'yelp.test.com';
    renderBusinessCardActions({ yelpUrl: expectedUrl });
    expect(screen.getByRole('link')).toHaveAttribute('href', expectedUrl);
  });
});
