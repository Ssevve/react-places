import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';
import { BusinessesFiltersOpener } from './BusinessesFilters';

export interface BusinessesEmptyListProps {
  city: string | null;
  openFilters: () => void;
}

export function BusinessesEmptyList({ city, openFilters }: BusinessesEmptyListProps) {
  return (
    <Box data-testid="businesses-empty-list">
      <BusinessesErrorMessage>
        <Box>
          <Typography marginBottom={1} fontWeight={700}>
            {city ? `No results for ${city}?` : 'No results?'}
          </Typography>
          <Typography>Consider changing the radius value in the</Typography>
          <BusinessesFiltersOpener type="text" openFilters={openFilters}>
            filters
          </BusinessesFiltersOpener>
        </Box>
      </BusinessesErrorMessage>
    </Box>
  );
}
