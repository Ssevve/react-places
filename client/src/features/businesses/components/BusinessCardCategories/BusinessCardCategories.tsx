import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Category } from '../../types';

interface BusinessCardCategoriesProps {
  categories: Array<Category>;
}

export function BusinessCardCategories({ categories }: BusinessCardCategoriesProps) {
  return categories && categories.length ? (
    <Box display="flex" gap={0.5} flexWrap="wrap">
      {categories.map(({ title }) => (
        <Chip key={title} label={title} size="small" sx={{ fontSize: 12 }} />
      ))}
    </Box>
  ) : null;
}
