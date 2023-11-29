import { App } from '@/App';
import { renderWithQueryProvider } from '@/utils/renderWithQueryProvider';
import { screen } from '@testing-library/react';

describe('App', () => {
  it('should render <Map /> component', () => {
    renderWithQueryProvider(<App />);
    screen.getByTestId('map');
  });
});
