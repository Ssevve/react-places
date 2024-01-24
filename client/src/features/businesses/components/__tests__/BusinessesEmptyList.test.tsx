import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesEmptyList, BusinessesEmptyListProps } from '../BusinessesEmptyList';

const renderBusinessesEmptyList = (props?: Partial<BusinessesEmptyListProps>) => {
  return render(<BusinessesEmptyList city="Test" openFilters={() => {}} {...props} />);
};

describe('BusinessesEmptyList', () => {
  it('should render correct message', () => {
    const expectedCity = 'London';
    renderBusinessesEmptyList({ city: expectedCity });
    expect(screen.getByText(`No results for ${expectedCity}?`)).toBeInTheDocument();
  });

  it('should render filter opener button', () => {
    renderBusinessesEmptyList();
    expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
  });

  it('should call openFilters on filters opener button click', async () => {
    const user = userEvent.setup();
    const mockOpenFilters = vi.fn();
    renderBusinessesEmptyList({ openFilters: mockOpenFilters });
    await user.click(screen.getByRole('button', { name: /filters/i }));
    expect(mockOpenFilters).toHaveBeenCalledOnce();
  });
});
