import Box from '@mui/material/Box';
import { BusinessesFiltersOpener } from '../BusinessesFiltersOpener';
import { BusinessList } from '..';
import { TransformedBusiness } from '../..';

interface BusinessesResultsProps {
  openFilters: () => void;
  businesses: Array<TransformedBusiness>;
  totalBusinesses: number;
}

export function BusinessesResults({
  openFilters,
  businesses,
  totalBusinesses,
}: BusinessesResultsProps) {
  return (
    <Box overflow="auto">
      <Box marginBottom={2} marginLeft={1}>
        <BusinessesFiltersOpener openFilters={openFilters} />
      </Box>
      <BusinessList businesses={businesses} totalBusinesses={totalBusinesses} />
    </Box>
  );
}
