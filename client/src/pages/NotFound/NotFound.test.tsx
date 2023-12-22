import { render, screen } from '@/tests/utils';
import { NotFound } from './NotFound';

const renderNotFound = () => {
  return render(<NotFound />);
};

describe('NotFound', () => {
  it('should render correct text', async () => {
    renderNotFound();
    expect(screen.getByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Oops!' })).toBeInTheDocument();
    expect(
      screen.getByText(
        "We don't have that page, but we can help you find something near you to visit.",
      ),
    ).toBeInTheDocument();
  });

  it('should render home page link', async () => {
    renderNotFound();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
