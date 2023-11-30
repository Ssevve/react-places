import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Category } from '../../api';

interface BusinessCardCategoriesProps {
  categories: Array<Category>;
}

export function BusinessCardCategories({ categories }: BusinessCardCategoriesProps) {
  return categories && categories.length ? (
    <Box display="flex" gap="0.25rem" flexWrap="wrap">
      {categories.map(({ title }) => (
        <Chip key={title} label={title} size="small" sx={{ fontSize: '0.75rem' }} />
      ))}
    </Box>
  ) : null;
}
