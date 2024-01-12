import { BusinessesFiltersOpener } from '../BusinessesFiltersOpener';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessesErrorMessage } from '..';
import { useSearchParams } from 'react-router-dom';

interface BusinessesNoResultsProps {
  openFilters: () => void;
}

export function BusinessesNoResults({ openFilters }: BusinessesNoResultsProps) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
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
