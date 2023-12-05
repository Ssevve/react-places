import { mockBusinessesResponse } from '@/__mocks__';
import { createReactQueryWrapper } from '@/tests';
import { render, screen, waitFor } from '@testing-library/react';
import { BusinessList } from '.';

const renderBusinessList = () => {
  return render(<BusinessList />, { wrapper: createReactQueryWrapper() });
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
