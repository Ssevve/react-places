import { render, screen } from '@testing-library/react';
import { BusinessesErrorFallback } from './BusinessesErrorFallback';

const renderBusinessesErrorFallback = () => {
  return render(<BusinessesErrorFallback resetErrorBoundary={() => vi.fn()} />);
};

describe('BusinessesErrorFallback', () => {
  it('should render error text', () => {
    renderBusinessesErrorFallback();
    expect(screen.getByText("Couldn't load businesses. Please try again.")).toBeInTheDocument();
  });

  it('should render "Try again" button', () => {
    renderBusinessesErrorFallback();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
