import { useBusinessesQuery } from '@/features/businesses';
import { useSearchParams } from 'react-router-dom';
import { BusinessesErrorMessage } from '../BusinessesErrorMessage';
import {
  BusinessesErrorFallback,
  BusinessesNoResults,
  BusinessesResults,
  BusinessesSkeleton,
} from './components';

interface BusinessesProps {
  openFilters: () => void;
}

export function Businesses({ openFilters }: BusinessesProps) {
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
