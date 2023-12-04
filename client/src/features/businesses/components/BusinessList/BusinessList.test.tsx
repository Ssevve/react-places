import { mockBusinessesResponse } from '@/__mocks__';
import { renderWithQueryProvider } from '@/tests';
import { screen, waitFor } from '@testing-library/react';
import { BusinessList } from '.';

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
