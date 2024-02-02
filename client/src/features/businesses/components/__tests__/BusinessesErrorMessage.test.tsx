import { render, screen } from '@/tests/utils';
import { BusinessesErrorMessage } from '../BusinessesErrorMessage';

describe('BusinessesErrorMessage', () => {
  it('should render correct image', () => {
    render(<BusinessesErrorMessage message="Test" />);
    expect(screen.getByTestId('DomainDisabledIcon')).toBeInTheDocument();
  });

  it('should render with correct message', () => {
    const expectedErrorMessage = 'Test error message';
    render(<BusinessesErrorMessage message={expectedErrorMessage} />);
    expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
  });
});
