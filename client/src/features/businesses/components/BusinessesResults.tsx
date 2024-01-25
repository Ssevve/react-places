import Box from '@mui/material/Box';
import { TransformedBusiness } from '../types';
import { BusinessesList } from './BusinessesList';
import { BusinessesPagination } from './BusinessesPagination';
import { BusinessesEmptyList } from './BusinessesEmptyList';

export interface BusinessesResultsProps {
  businesses: Array<TransformedBusiness>;
  currentPage: number;
  pageCount: number;
  openFilters: () => void;
  city: string;
}

export function BusinessesResults({
  businesses,
  currentPage,
  pageCount,
  openFilters,
  city,
}: BusinessesResultsProps) {
  return businesses.length ? (
    <Box data-testid="businesses-results">
      <BusinessesList businesses={businesses} />
      {pageCount > 1 && <BusinessesPagination currentPage={currentPage} pageCount={pageCount} />}
    </Box>
  ) : (
    <BusinessesEmptyList city={city} openFilters={openFilters} />
  );
}
