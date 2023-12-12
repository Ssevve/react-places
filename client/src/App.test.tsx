import { App } from '@/App';
import { render, screen } from '@/tests/utils';

describe('App', () => {
  it('should render <Map /> component', () => {
    render(<App />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render <ContentDrawer /> component', () => {
    render(<App />);
    expect(screen.getByTestId('content-drawer')).toBeInTheDocument();
  });
});
