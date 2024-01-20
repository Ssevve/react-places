import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';
import { BusinessesFiltersOpener } from './BusinessesFilters';

export interface BusinessesNoResultsProps {
  openFilters: () => void;
  city: string;
}

export function BusinessesNoResults({ openFilters, city }: BusinessesNoResultsProps) {
  return (
    <>
      <Box marginBottom={2} marginLeft={1}>
        <BusinessesFiltersOpener openFilters={openFilters} />
      </Box>
      <BusinessesErrorMessage>
        <Box>
          <Typography marginBottom={1} fontWeight={700}>
            No results for {city}?
          </Typography>
          <Typography>Consider changing the radius value in the</Typography>
          <BusinessesFiltersOpener type="text" openFilters={openFilters}>
            filters
          </BusinessesFiltersOpener>
        </Box>
      </BusinessesErrorMessage>
    </>
  );
}
