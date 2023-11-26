import { screen } from '@testing-library/react';

import { App } from '@/App';
import { renderWithQueryProvider } from '@/utils/renderWithQueryProvider';

describe('App', () => {
  it('should render <Map /> component', () => {
    renderWithQueryProvider(<App />);
    screen.getByTestId('map');
  });
});
