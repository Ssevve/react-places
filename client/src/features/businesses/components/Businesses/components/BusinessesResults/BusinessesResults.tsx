import { BusinessesFiltersOpener, businessesPerPage, TransformedBusiness } from '@/features/businesses';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useSearchParams } from 'react-router-dom';
import { BusinessesResultsList, BusinessesResultsPagination } from './components';

interface BusinessesResultsProps {
  openFilters: () => void;
  businesses: Array<TransformedBusiness>;
  totalBusinesses: number;
}

export function BusinessesResults({ openFilters, businesses, totalBusinesses }: BusinessesResultsProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / businessesPerPage) : 1;
  return (
    <Box overflow="auto">
      <Box marginBottom={2} marginLeft={1}>
        <BusinessesFiltersOpener openFilters={openFilters} />
      </Box>
      <BusinessesResultsList businesses={businesses} />
      <Divider />
      <BusinessesResultsPagination currentPage={currentPage} pageCount={pageCount} />
    </Box>
  );
}
