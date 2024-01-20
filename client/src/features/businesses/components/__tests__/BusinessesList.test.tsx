import { mockTransformedBusiness } from '@/__mocks__';
import { TransformedBusiness } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessesList } from '../BusinessesList';

describe('BusinessesList', () => {
  it('should render all businesses', () => {
    const expectedBusinesses: Array<TransformedBusiness> = [
      { ...mockTransformedBusiness, id: '1', name: 'Business 1' },
      { ...mockTransformedBusiness, id: '2', name: 'Business 2' },
    ];
    render(<BusinessesList businesses={expectedBusinesses} />, {
      initialEntries: ['?city=Test'],
    });
    expectedBusinesses.forEach(({ name }) => {
      expect(screen.getByText(name, { exact: false })).toBeInTheDocument();
    });
  });
});
