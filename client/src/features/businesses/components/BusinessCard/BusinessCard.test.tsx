import { mockTransformedBusiness } from '@/__mocks__';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BusinessCard, BusinessCardProps } from './BusinessCard';

const testProps: BusinessCardProps = {
  business: mockTransformedBusiness,
  isExpanded: false,
  setCenteredBusinessId: vi.fn(),
  toggleDrawer: vi.fn(),
  toggleExpanded: vi.fn(),
};

const renderBusinessCard = (props?: Partial<BusinessCardProps>) => {
  return render(<BusinessCard {...testProps} {...props} />);
};

describe('BusinessCard', () => {
  it('should render <BusinessImage /> component', () => {
    renderBusinessCard();
    expect(screen.getByRole('img', { name: mockTransformedBusiness.name })).toBeInTheDocument();
  });

  it('should render <BusinessBaseInfo /> component', () => {
    renderBusinessCard();
    expect(screen.getByText(mockTransformedBusiness.rating)).toBeInTheDocument();
  });

  it('should render <BusinessCardCategories /> component', () => {
    renderBusinessCard();
    expect(screen.getByText(mockTransformedBusiness.categories[0].title)).toBeInTheDocument();
  });

  it('should render Yelp link for the business', () => {
    renderBusinessCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', mockTransformedBusiness.url);
  });

  it('should render <BusinessCardContactInfo /> if expanded', async () => {
    renderBusinessCard({ isExpanded: true });
    expect(screen.getByText(mockTransformedBusiness.displayPhone)).toBeInTheDocument();
  });

  it('should not render <BusinessCardContactInfo /> if not expanded', async () => {
    renderBusinessCard({ isExpanded: false });
    expect(screen.queryByText(mockTransformedBusiness.displayPhone)).not.toBeInTheDocument();
  });

  it('should render button to center the business on the map', async () => {
    renderBusinessCard();
    expect(screen.getByText(/show on map/i)).toBeInTheDocument();
  });

  it('should call "setCenteredBusinessId" and "toggleDrawer" on "center business" button click', async () => {
    const user = userEvent.setup();
    const setCenteredBusinessId = vi.fn();
    const toggleDrawer = vi.fn();
    renderBusinessCard({ setCenteredBusinessId, toggleDrawer });

    await user.click(screen.getByText(/show on map/i));

    expect(setCenteredBusinessId).toHaveBeenCalledOnce();
    expect(toggleDrawer).toHaveBeenCalledOnce();
  });

  it('should call "toggleExpanded" on click', async () => {
    const user = userEvent.setup();
    const toggleExpanded = vi.fn();
    renderBusinessCard({ toggleExpanded });

    await user.click(screen.getByTestId('business-card-action-area'));

    expect(toggleExpanded).toHaveBeenCalledOnce();
  });
});
