import { useCitiesQuery } from '@/features/cities';
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
  search: string;
  isNewCity: boolean;
}

export function BusinessesContainer({ openFilters, search, isNewCity }: BusinessesContainerProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const city = searchParams.get('city');

  const { isSuccess: isCitiesQuerySuccess } = useCitiesQuery({ query: search });

  const {
    data: businessesQueryData,
    isLoading: isBusinessesQueryLoading,
    isError: isBusinessesQueryError,
    refetch: refetchBusinesses,
  } = useBusinessesQuery({
    isEnabled: isCitiesQuerySuccess && isNewCity && !!city,
  });

  const businesses = businessesQueryData?.businesses;
  const totalBusinesses = businessesQueryData?.totalBusinesses || 0;
  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / BUSINESSES_PER_PAGE) : 1;

  const renderContent = () => {
    if (businesses) {
      return (
        <BusinessesResults
          businesses={businesses}
          currentPage={currentPage}
          pageCount={pageCount}
          city={city}
          openFilters={openFilters}
        />
      );
    }

    if (isBusinessesQueryError) {
      return <BusinessesFetchError refetch={refetchBusinesses} />;
    }

    if (isBusinessesQueryLoading) {
      return <BusinessesSkeleton />;
    }

    return (
      <BusinessesErrorMessage message="You need to provide a city before we can show you cool places to visit!" />
    );
  };

  return (
    <Box data-testid="businesses-container" overflow="auto">
      {renderContent()}
    </Box>
  );
}
