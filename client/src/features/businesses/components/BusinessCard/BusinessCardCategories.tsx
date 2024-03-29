import { Category } from '@/features/businesses';
import { List, ListItem } from '@mui/material';
import Chip from '@mui/material/Chip';

export interface BusinessCardCategoriesProps {
  categories: Array<Category>;
}

export function BusinessCardCategories({ categories }: BusinessCardCategoriesProps) {
  return categories && categories.length ? (
    <List
      data-testid="business-card-categories"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
      }}
    >
      {categories.map((category) => (
        <ListItem
          key={category}
          sx={{
            padding: 0,
            width: 'max-content',
          }}
        >
          <Chip label={category} size="small" sx={{ fontSize: 12, pointerEvents: 'none' }} />
        </ListItem>
      ))}
    </List>
  ) : null;
}
