import { render, screen } from '@testing-library/react';

import { App } from '@/components/App';

describe('App', () => {
  it('should render Hello text', () => {
    render(<App />);
    screen.getByText('Hello');
  });
});
