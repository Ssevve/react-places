import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import { BUSINESSES_PER_PAGE } from '../constants';
import { useBusinessesQuery } from '../hooks';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';
import { BusinessesFetchError } from './BusinessesFetchError';
import { BusinessesResults } from './BusinessesResults';
import { BusinessesSkeleton } from './BusinessesSkeleton';

interface BusinessesContainerProps {
  openFilters: () => void;
}

export function BusinessesContainer({ openFilters }: BusinessesContainerProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const city = searchParams.get('city');
  const { data, isLoading, isError, refetch } = useBusinessesQuery();
  const businesses = data?.businesses || [];
  const totalBusinesses = data?.totalBusinesses || 0;
  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / BUSINESSES_PER_PAGE) : 1;

  const shouldRenderResults = businesses && city && !isError && !isLoading;

  return (
    <Box data-testid="businesses-container" overflow="auto">
      {isError && <BusinessesFetchError refetch={refetch} />}
      {isLoading && <BusinessesSkeleton />}
      {!city && (
        <BusinessesErrorMessage message="You need to provide a city before we can show any results!" />
      )}
      {shouldRenderResults && (
        <BusinessesResults
          businesses={businesses}
          currentPage={currentPage}
          pageCount={pageCount}
          city={city}
          openFilters={openFilters}
        />
      )}
    </Box>
  );
}
