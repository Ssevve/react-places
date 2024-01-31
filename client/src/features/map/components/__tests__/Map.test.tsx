import { render, screen, waitFor } from '@/tests/utils';
import { Map } from '../Map';
import { mockFetchBusinessesResponse } from '@/__mocks__/data';

const renderMap = () => {
  return render(<Map />, {
    initialEntries: ['?city=Warsaw'],
  });
};

describe('Map', () => {
  it('should render markers for all businesses', async () => {
    renderMap();
    await waitFor(() => {
      mockFetchBusinessesResponse.businesses.forEach(({ displayIndex }) => {
        expect(screen.getByText(displayIndex)).toBeInTheDocument();
      });
    });
  });

  it('should render zoom controls', () => {
    renderMap();
    expect(screen.getByRole('button', { name: /zoom in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zoom out/i })).toBeInTheDocument();
  });
});
