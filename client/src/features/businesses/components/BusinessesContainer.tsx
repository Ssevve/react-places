import { useBusinessesQuery } from '@/features/businesses';
import { useSearchParams } from 'react-router-dom';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';
import { BusinessesErrorFallback } from './BusinessesErrorFallback';
import { BusinessesResults } from './BusinessesResults';
import { BusinessesSkeleton } from './BusinessesSkeleton';
import { BusinessesNoResults } from './BusinessesNoResults';

interface BusinessesContainerProps {
  openFilters: () => void;
}

export function BusinessesContainer({ openFilters }: BusinessesContainerProps) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  const { data, isLoading, isError } = useBusinessesQuery();
  const businesses = data?.businesses || [];
  const totalBusinesses = data?.total || 0;

  if (isError) {
    return <BusinessesErrorFallback />;
  }

  if (isLoading) {
    return <BusinessesSkeleton />;
  }

  if (!city) {
    return <BusinessesErrorMessage message="You need to provide a city before we can show any results!" />;
  }

  if (businesses.length === 0) {
    return <BusinessesNoResults openFilters={openFilters} city={city} />;
  }

  return (
    <BusinessesResults businesses={businesses} openFilters={openFilters} totalBusinesses={totalBusinesses} />
  );
}
