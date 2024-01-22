import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesDrawer } from '../BusinessesDrawer';

const renderBusinessesDrawer = (initialEntries: Array<string> = ['/']) => {
  return render(<BusinessesDrawer />, { initialEntries });
};

describe('BusinessesDrawer', () => {
  it('should render city autocomplete input', () => {
    renderBusinessesDrawer();
    expect(screen.getByRole('combobox', { name: 'Select a city' })).toBeInTheDocument();
  });

  it('should render businesses container', () => {
    renderBusinessesDrawer();
    expect(screen.getByTestId('businesses-container')).toBeInTheDocument();
  });

  it('should render filters opener after successful fetch', async () => {
    renderBusinessesDrawer(['/?city=Warsaw']);
    expect(await screen.findByRole('button', { name: 'Filters' })).toBeInTheDocument();
  });

  it('should show filters on filters opener click', async () => {
    const user = userEvent.setup();
    renderBusinessesDrawer(['/?city=Warsaw']);
    const filtersButton = await screen.findByRole('button', { name: 'Filters' });
    await user.click(filtersButton);
    expect(screen.getByTestId('businesses-filters')).toBeInTheDocument();
  });
});
