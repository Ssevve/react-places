import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesFiltersSetButton } from './BusinessesFiltersSetButton';

describe('BusinessesFiltersSetButton', () => {
  it('should call "setFilters" prop on click', async () => {
    const user = userEvent.setup();
    const mockSetFilters = vi.fn();

    render(<BusinessesFiltersSetButton setFilters={mockSetFilters} />);
    await user.click(screen.getByRole('button'));

    expect(mockSetFilters).toHaveBeenCalledOnce();
  });
});
