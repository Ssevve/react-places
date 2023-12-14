import { render, screen } from '@testing-library/react';
import { BusinessCardCategories } from '.';
import { Category } from '../../types';

const categories: Category[] = [
  {
    alias: 'polish',
    title: 'Polish',
  },
  {
    alias: 'modern_european',
    title: 'Modern European',
  },
];

describe('BusinessCardCategories', () => {
  it('should render all provided categories', () => {
    // Silence the duplicate keys warning (caused by mocking library)
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<BusinessCardCategories categories={categories} />);
    categories.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
