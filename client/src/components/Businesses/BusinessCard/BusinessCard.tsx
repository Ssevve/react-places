import { Business } from '@/api/businesses/useBusinessesQuery';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return <div>{business.displayPhone}</div>;
}
