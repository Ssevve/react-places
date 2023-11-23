import { BusinessCard } from './BusinessCard';
import { useBusinessesQuery } from '@/hooks/useBusinessesQuery';

export const Businesses = () => {
  const { data: businesses, error } = useBusinessesQuery();
  console.log(error?.message);
  if (businesses) {
    return businesses.businesses.map((business) => (
      <BusinessCard key={business.id} business={business} />
    ));
  }

  if (error) return <span>Error!</span>;
  return <span>Loading...</span>;
};
