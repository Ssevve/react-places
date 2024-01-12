import { render, screen } from '@/tests/utils';
import { BusinessesErrorFallback } from './BusinessesErrorFallback';

const renderBusinessesErrorFallback = () => {
  return render(<BusinessesErrorFallback />);
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
