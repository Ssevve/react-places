import { BusinessCard } from '@/components/BusinessCard';

interface BusinessesProps {
  businesses: any[];
}

export const Businesses = ({ businesses }: BusinessesProps) => {
  return businesses.map((business) => <BusinessCard key={business.id} business={business} />);
};
