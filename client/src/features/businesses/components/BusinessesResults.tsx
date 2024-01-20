import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useSearchParams } from 'react-router-dom';
import { TransformedBusiness } from '../types';
import { BusinessesFiltersOpener } from './BusinessesFilters';
import { BusinessesList } from './BusinessesList';
import { BusinessesPagination } from './BusinessesPagination';

export interface BusinessesResultsProps {
  openFilters: () => void;
  businesses: Array<TransformedBusiness>;
  totalBusinesses: number;
}

export function BusinessesResults({ openFilters, businesses, totalBusinesses }: BusinessesResultsProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  return (
    <Box>
      <Box marginBottom={2} marginLeft={1}>
        <BusinessesFiltersOpener openFilters={openFilters} />
      </Box>
      <BusinessesList businesses={businesses} />
      <Divider />
      <BusinessesPagination currentPage={currentPage} totalBusinesses={totalBusinesses} />
    </Box>
  );
}
