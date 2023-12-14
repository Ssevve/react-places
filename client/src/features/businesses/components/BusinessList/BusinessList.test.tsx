import { mockYelpBusinessesResponse } from '@/__mocks__';
import { render, screen, waitFor } from '@/tests/utils';
import { BusinessList } from './BusinessList';

const renderBusinessList = () => {
  return render(<BusinessList setCenteredBusinessId={vi.fn()} toggleDrawer={vi.fn()} />);
};

describe('BusinessList', () => {
  it('should render correct amount of businesses', async () => {
    renderBusinessList();
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        mockYelpBusinessesResponse.businesses.length,
      );
    });
  });

  it('should render <BusinessListSkeleton /> while fetching data', async () => {
    renderBusinessList();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
