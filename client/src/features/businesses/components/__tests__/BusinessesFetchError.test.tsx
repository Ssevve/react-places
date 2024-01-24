import { render, screen } from '@/tests/utils';
import { userEvent } from '@testing-library/user-event';
import { BusinessesFetchError, BusinessesFetchErrorProps } from '../BusinessesFetchError';

const renderBusinessesFetchError = (props?: Partial<BusinessesFetchErrorProps>) => {
  return render(<BusinessesFetchError refetch={() => Promise.resolve()} {...props} />);
};

describe('BusinessesFetchError', () => {
  it('should render correct message', () => {
    renderBusinessesFetchError();
    expect(screen.getByText("Couldn't load businesses. Please try again.")).toBeInTheDocument();
  });
  it('should render try again button', () => {
    renderBusinessesFetchError();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('should call refetch on try again button click', async () => {
    const user = userEvent.setup();
    const mockRefetch = vi.fn();
    renderBusinessesFetchError({ refetch: mockRefetch });
    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockRefetch).toHaveBeenCalledOnce();
  });
});
