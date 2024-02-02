import { render, screen } from '@/tests/utils';
import { Home } from '../Home';

const renderHome = () => {
  return render(<Home />);
};

describe('Home', () => {
  it('should render <Map /> component', () => {
    renderHome();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render <BusinessesDrawer /> component', () => {
    renderHome();
    expect(screen.getByTestId('businesses-drawer')).toBeInTheDocument();
  });
});
