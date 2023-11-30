import { render, screen } from '@testing-library/react';
import { BusinessCardCategories } from '.';
import { Category } from '../../api';

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
    render(<BusinessCardCategories categories={categories} />);
    categories.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
