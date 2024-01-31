import { mockBusiness } from '@/__mocks__/data';
import { Business } from '@/features/businesses';
import { render, screen } from '@/tests/utils';
import { BusinessesList } from '../BusinessesList';

describe('BusinessesList', () => {
  it('should render all businesses', () => {
    const expectedBusinesses: Array<Business> = [
      { ...mockBusiness, id: '1', name: 'Business 1' },
      { ...mockBusiness, id: '2', name: 'Business 2' },
    ];
    render(<BusinessesList businesses={expectedBusinesses} />, {
      initialEntries: ['?city=Test'],
    });
    expectedBusinesses.forEach(({ name }) => {
      expect(screen.getByText(name, { exact: false })).toBeInTheDocument();
    });
  });
});
