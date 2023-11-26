import { BusinessCard } from './BusinessCard';
import { useBusinessesQuery } from '@/api/businesses/useBusinessesQuery';
import { useState } from 'react';

export function BusinessList() {
  const [expandedBusiness, setExpandedBusiness] = useState(-1);

  const { data: businesses, error } = useBusinessesQuery();

  const toggleBusinessExpanded = (index: number) => {
    return setExpandedBusiness((prev) => (prev === index ? -1 : index));
  };

  if (businesses) {
    return businesses.businesses.map((business, index) => (
      <BusinessCard
        key={business.id}
        business={business}
        index={index + 1}
        isExpanded={expandedBusiness === index}
        setExpanded={() => toggleBusinessExpanded(index)}
      />
    ));
  }

  if (error) return <span>Error!</span>;
  return <span>Loading...</span>;
}
