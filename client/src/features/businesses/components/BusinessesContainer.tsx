import { useBusinessesQuery } from '@/features/businesses';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useSearchParams } from 'react-router-dom';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';
import { BusinessesFiltersOpener } from './BusinessesFilters';
import { BusinessesList } from './BusinessesList';
import { BusinessesPagination } from './BusinessesPagination';
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
  const totalBusinesses = data?.total || 0;

  const renderContents = () => {
    if (isError) {
      return (
        <Box role="alert" display="grid" justifyContent="center" paddingX={2} textAlign="center">
          <BusinessesErrorMessage message="Couldn't load businesses. Please try again." />
          <Button variant="contained" onClick={() => refetch()}>
            Try again
          </Button>
        </Box>
      );
    }

    if (isLoading) {
      return <BusinessesSkeleton />;
    }

    if (!city) {
      return <BusinessesErrorMessage message="You need to provide a city before we can show any results!" />;
    }

    if (businesses.length === 0) {
      return (
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
      );
    }
    return (
      <>
        <BusinessesList businesses={businesses} />
        <Divider />
        <BusinessesPagination currentPage={currentPage} totalBusinesses={totalBusinesses} />
      </>
    );
  };

  return (
    <Box data-testid="businesses-container" overflow="auto">
      {renderContents()}
    </Box>
  );
}
