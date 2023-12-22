import { mockYelpBusinessesResponse } from '@/__mocks__';
import { server } from '@/__mocks__/server';
import { render, screen, waitFor } from '@/tests/utils';
import { generateMock } from '@anatine/zod-mock';
import { HttpResponse, http } from 'msw';
import { yelpBusinessesResponseSchema } from '../../api';
import { BusinessList } from './BusinessList';

const renderBusinessList = () => {
  const emptyFunction = () => {};
  return render(
    <BusinessList setCenteredBusinessId={emptyFunction} toggleDrawer={emptyFunction} />,
  );
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

  it('should show correct message when there are no businesses to show', async () => {
    server.use(
      http.get('http://localhost:5000/yelp', () =>
        HttpResponse.json({ ...generateMock(yelpBusinessesResponseSchema), businesses: [] }),
      ),
    );
    renderBusinessList();
    await waitFor(() => {
      expect(
        screen.getByText('Unfortunately, there are no businesses to show.'),
      ).toBeInTheDocument();
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
