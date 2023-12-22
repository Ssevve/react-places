import { mockYelpBusinessesResponse } from '@/__mocks__';
import { render, screen, waitFor } from '@/tests/utils';
import { BusinessList } from './BusinessList';

const renderBusinessList = () => {
  return render(<BusinessList setCenteredBusinessId={vi.fn()} toggleDrawer={vi.fn()} />);
};

describe('BusinessList', () => {
  it('should render all businesses', async () => {
    const expectedBusinesses = mockYelpBusinessesResponse.businesses;
    renderBusinessList();
    await waitFor(() => {
      expectedBusinesses.forEach(({ name }) =>
        expect(screen.getByText(name, { exact: false })).toBeInTheDocument(),
      );
    });
  });

  it('should render <BusinessListPagination /> component', async () => {
    renderBusinessList();
    await waitFor(() => {
      expect(screen.getByLabelText('pagination navigation')).toBeInTheDocument();
    });
  });

  it('should render <BusinessListSkeleton /> while fetching data', async () => {
    renderBusinessList();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
