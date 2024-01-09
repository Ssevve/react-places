import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesFiltersSetButton } from './BusinessesFiltersSetButton';

describe('BusinessesFiltersSetButton', () => {
  it('should call "setFilters" and "closeFilters" props on click', async () => {
    const user = userEvent.setup();
    const mockSetFilters = vi.fn();
    const mockCloseFilters = vi.fn();

    render(
      <BusinessesFiltersSetButton setFilters={mockSetFilters} closeFilters={mockCloseFilters} />,
    );
    await user.click(screen.getByRole('button'));

    expect(mockSetFilters).toHaveBeenCalledOnce();
    expect(mockCloseFilters).toHaveBeenCalledOnce();
  });
});
