import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BusinessCard, BusinessCardProps } from '.';
import camelize from 'camelize-ts';
import { generateMock } from '@anatine/zod-mock';
import { businessSchema } from '../../api';

const business: BusinessCardProps['business'] = camelize(generateMock(businessSchema));

const testProps: BusinessCardProps = {
  business,
  index: 0,
  isExpanded: false,
  setExpanded: vi.fn(),
};

const renderBusinessCard = (props?: Partial<BusinessCardProps>) => {
  return render(<BusinessCard {...testProps} {...props} />);
};

describe('BusinessCard', () => {
  it('should render <BusinessImage /> component', () => {
    renderBusinessCard();
    expect(screen.getByRole('img', { name: business.name })).toBeInTheDocument();
  });

  it('should render <BusinessBaseInfo /> component', () => {
    renderBusinessCard();
    expect(screen.getByText(business.rating)).toBeInTheDocument();
  });

  it('should render <BusinessCardCategories /> component', () => {
    renderBusinessCard();
    expect(screen.getByText(business.categories[0].title)).toBeInTheDocument();
  });

  it('should render Yelp link for the business', () => {
    renderBusinessCard();
    expect(screen.getByRole('link')).toHaveAttribute('href', business.url);
  });

  it('should render <BusinessCardContactInfo /> if expanded', async () => {
    renderBusinessCard({ isExpanded: true });
    expect(screen.getByText(business.displayPhone)).toBeInTheDocument();
  });

  it('should not render <BusinessCardContactInfo /> if not expanded', async () => {
    renderBusinessCard({ isExpanded: false });
    expect(screen.queryByText(business.displayPhone)).not.toBeInTheDocument();
  });

  it('should call "setExpanded" on click', async () => {
    const user = userEvent.setup();
    const setExpanded = vi.fn();
    renderBusinessCard({ setExpanded });
    const clickableArea = screen.getByRole('button');
    await user.click(clickableArea);
    expect(setExpanded).toHaveBeenCalledOnce();
  });
});
