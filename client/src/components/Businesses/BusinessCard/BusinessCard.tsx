import { Business } from '@/hooks/useBusinessesQuery';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
  return <div>{business.displayPhone}</div>;
};
