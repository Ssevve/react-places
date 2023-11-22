import { render, screen } from '@testing-library/react';

import { App } from '@/App';

describe('App', () => {
  it('should render <Map /> component', () => {
    render(<App />);
    screen.getByTestId('map');
  });
});
