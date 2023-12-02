import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BusinessCard, BusinessCardProps } from '.';

const business: BusinessCardProps['business'] = {
  categories: [
    {
      alias: 'pierogis',
      title: 'Pierogis',
    },
  ],
  displayPhone: '+48 58 400 30 20',
  id: 'nnhonxbvEsdMc5bLeF9U6w',
  imageUrl: 'https://s3-media3.fl.yelpcdn.com/bphoto/qTbDhHqoRwR_CD4jyF-CoQ/o.jpg',
  isClosed: false,
  location: {
    displayAddress: ['ul. Elżbietańska', '80-834 Gdańsk', 'Poland'],
  },
  name: 'Pierogarnia',
  price: 2,
  rating: 5,
  reviewCount: 43,
  url: 'https://www.yelp.com/biz/pierogarniagdansk',
};

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
