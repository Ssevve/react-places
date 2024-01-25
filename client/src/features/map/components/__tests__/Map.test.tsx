import { render, screen, waitFor } from '@/tests/utils';
import { Map } from './Map';
import { mockYelpBusinessesResponse } from '@/__mocks__';
import camelize from 'camelize-ts';

const renderMap = () => {
  return render(<Map />, {
    initialEntries: ['?city=Warsaw'],
  });
};

describe('Map', () => {
  it('should render markers for all businesses', async () => {
    const expectedBusinesses = camelize(mockYelpBusinessesResponse).businesses.map((business, index) => ({
      ...business,
      displayIndex: index + 1,
    }));
    renderMap();
    await waitFor(() => {
      expectedBusinesses.forEach(({ displayIndex }) => {
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
