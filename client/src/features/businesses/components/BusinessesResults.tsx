import Box from '@mui/material/Box';
import { Business } from '../api';
import { BusinessesEmptyList } from './BusinessesEmptyList';
import { BusinessesList } from './BusinessesList';
import { BusinessesPagination } from './BusinessesPagination';

export interface BusinessesResultsProps {
  businesses: Array<Business>;
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
