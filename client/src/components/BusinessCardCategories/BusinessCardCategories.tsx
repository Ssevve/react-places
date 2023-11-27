import { Category } from '@/api/businesses/useBusinessesQuery';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface BusinessCardCategoriesProps {
  categories: Array<Category>;
}

// TODO: tests
export function BusinessCardCategories({ categories }: BusinessCardCategoriesProps) {
  return (
    <Box display="flex" gap="0.25rem" flexWrap="wrap">
      {categories.map(({ title }) => (
        <Chip key={title} label={title} size="small" sx={{ fontSize: '0.75rem' }} />
      ))}
    </Box>
  );
}
