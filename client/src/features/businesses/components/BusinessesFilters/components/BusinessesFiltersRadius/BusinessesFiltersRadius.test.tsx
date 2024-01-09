import { render, screen } from '@/tests/utils';
import { BusinessesFiltersRadius, BusinessesFiltersRadiusProps } from './BusinessesFiltersRadius';

const renderBusinessesFiltersRadius = (props?: Partial<BusinessesFiltersRadiusProps>) => {
  return render(<BusinessesFiltersRadius setRadius={() => {}} radius={5000} {...props} />);
};

describe('BusinessesFiltersRadius', () => {
  it('should render correct heading', () => {
    renderBusinessesFiltersRadius();
    expect(screen.getByRole('heading', { name: 'Radius' })).toBeInTheDocument();
  });

  it('should render slider component', () => {
    renderBusinessesFiltersRadius();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should render slider with correct value', () => {
    const expectedRadius = 15000;
    renderBusinessesFiltersRadius({ radius: expectedRadius });
    expect(screen.getByRole('slider')).toHaveValue(expectedRadius.toString());
  });
});
