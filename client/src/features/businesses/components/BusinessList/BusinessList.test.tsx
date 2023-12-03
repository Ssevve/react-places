import { renderWithQueryProvider } from '@/utils/renderWithQueryProvider';
import { screen, waitFor } from '@testing-library/react';
import { BusinessList } from '.';
import { mockBusinessesResponse } from '@/__mocks__/data/mockBusinessesResponse';

const renderBusinessList = () => {
  return renderWithQueryProvider(<BusinessList />);
};

describe('BusinessList', () => {
  it('should render correct amount of businesses', async () => {
    renderBusinessList();
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        mockBusinessesResponse.businesses.length,
      );
    });
  });

  it('should render <BusinessListSkeleton /> while fetching data', async () => {
    renderBusinessList();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
