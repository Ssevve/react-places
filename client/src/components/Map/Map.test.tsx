import { render, screen, waitFor } from '@/tests/utils';
import { Map, MapProps } from './Map';
import { mockYelpBusinessesResponse } from '@/__mocks__';
import camelize from 'camelize-ts';

const testProps: MapProps = {
  centeredBusinessId: 'testId',
  clearCenteredBusiness: () => {},
};

const renderMap = (props?: Partial<MapProps>) => {
  return render(<Map {...testProps} {...props} />);
};

describe('Map', () => {
  it('should render markers for all businesses', async () => {
    const expectedBusinesses = camelize(mockYelpBusinessesResponse).businesses.map(
      (business, index) => ({ ...business, displayIndex: index + 1 }),
    );
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
