import { render, screen } from '@testing-library/react';
import { BusinessListErrorFallback } from '.';

const renderBusinessListErrorFallback = () => {
  return render(<BusinessListErrorFallback resetErrorBoundary={() => vi.fn()} />);
};

describe('BusinessListErrorFallback', () => {
  it('should render error text', () => {
    renderBusinessListErrorFallback();
    expect(screen.getByText("Couldn't load businesses")).toBeInTheDocument();
  });

  it('should render "Try again" button', () => {
    renderBusinessListErrorFallback();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
