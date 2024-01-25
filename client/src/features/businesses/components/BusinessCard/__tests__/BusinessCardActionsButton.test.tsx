import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessCardActionsButton, BusinessCardActionsButtonProps } from '../BusinessCardActionsButton';

const renderBusinessCardActionsButton = (props?: Partial<BusinessCardActionsButtonProps>) => {
  return render(<BusinessCardActionsButton label="Test" onClick={() => {}} {...props} />);
};

describe('BusinessCardActionsButton', () => {
  it('should render with correct label', () => {
    const expectedLabel = 'Test';
    renderBusinessCardActionsButton({ label: expectedLabel });
    expect(screen.getByRole('button', { name: expectedLabel })).toBeInTheDocument();
  });

  it('should call onClick prop on click', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    renderBusinessCardActionsButton({ onClick: mockOnClick });
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledOnce();
  });
});
