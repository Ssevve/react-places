import { Home } from './Home';
import { render, screen } from '@/tests/utils';

const renderHome = () => {
  return render(<Home />);
};

describe('Home', () => {
  it('should render <Map /> component', () => {
    renderHome();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render <ContentDrawer /> component', () => {
    renderHome();
    expect(screen.getByTestId('content-drawer')).toBeInTheDocument();
  });
});
