import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../api';
import { BusinessesErrorFallback, BusinessesErrorMessage } from '../../components';
import { BusinessListSkeleton } from '../BusinessListSkeleton';
import { BusinessesNoResults } from '../BusinessesNoResults';
import { BusinessesResults } from '../BusinessesResults';

interface BusinessesProps {
  openFilters: () => void;
}

export function Businesses({ openFilters }: BusinessesProps) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  const getBusinesses = useBusinessesQuery();
  const businesses = getBusinesses.data?.businesses || [];
  const totalBusinesses = getBusinesses.data?.total || 0;

  if (getBusinesses.isError) {
    return <BusinessesErrorFallback />;
  }

  if (getBusinesses.isLoading) {
    return <BusinessListSkeleton />;
  }

  if (!city) {
    return (
      <BusinessesErrorMessage message="You need to provide a city before we can show any results!" />
    );
  }

  if (businesses.length === 0) {
    return <BusinessesNoResults openFilters={openFilters} />;
  }

  return (
    <BusinessesResults
      businesses={businesses}
      openFilters={openFilters}
      totalBusinesses={totalBusinesses}
    />
  );
}
