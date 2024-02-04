import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesDrawer } from '../BusinessesDrawer';

const renderBusinessesDrawer = (initialEntries: Array<string> = ['/']) => {
  return render(<BusinessesDrawer />, { initialEntries });
};

describe('BusinessesDrawer', () => {
  it('should render controls', () => {
    renderBusinessesDrawer();
    expect(screen.getByTestId('businesses-drawer-controls')).toBeInTheDocument();
  });

  it('should render businesses container', () => {
    renderBusinessesDrawer();
    expect(screen.getByTestId('businesses-container')).toBeInTheDocument();
  });

  it('should render filters opener', () => {
    renderBusinessesDrawer(['/?city=Warsaw']);
    expect(screen.getByRole('button', { name: 'Filters' })).toBeInTheDocument();
  });

  it('should show filters on filters opener click', async () => {
    const user = userEvent.setup();
    renderBusinessesDrawer(['/?city=Warsaw']);
    const filtersButton = await screen.findByRole('button', { name: 'Filters' });
    await user.click(filtersButton);
    expect(screen.getByTestId('businesses-filters')).toBeInTheDocument();
  });
});
