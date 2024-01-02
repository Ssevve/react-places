/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from '@/tests/utils';
import { Businesses } from './Businesses';

const renderBusinesses = (city = '') => {
  return render(<Businesses setHighlightedBusinessId={vi.fn()} toggleDrawer={vi.fn()} />, {
    initialEntries: [`/?city=${city}`],
  });
};

const initialMessage = 'You need to provide a city before we can show recommended places!';

describe('Businesses', () => {
  it('should render correct message if initial city input was not provided', () => {
    renderBusinesses();
    expect(screen.getByText(initialMessage)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render loader when fetching businesses data', () => {
    renderBusinesses('Warsaw');
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText(initialMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /businesses/i })).not.toBeInTheDocument();
  });

  it('should render list of fetched businesses', async () => {
    renderBusinesses('Warsaw');
    await waitFor(() => {
      expect(screen.getByRole('list', { name: /businesses/i })).toBeInTheDocument();
    });
    expect(screen.queryByText(initialMessage)).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
