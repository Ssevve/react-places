import { BusinessCard } from './BusinessCard';
import { useBusinessesQuery } from '@/api/businesses/useBusinessesQuery';

export function Businesses() {
  const { data: businesses, error } = useBusinessesQuery();
  if (businesses) {
    return businesses.businesses.map((business) => (
      <BusinessCard key={business.id} business={business} />
    ));
  }

  if (error) return <span>Error!</span>;
  return <span>Loading...</span>;
}
