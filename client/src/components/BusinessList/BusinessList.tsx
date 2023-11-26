import { BusinessCard } from '@/components/BusinessCard';
import { useBusinessesQuery } from '@/api/businesses/useBusinessesQuery';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';

export function BusinessList() {
  const [expandedBusiness, setExpandedBusiness] = useState(-1);

  const { data: businesses, error } = useBusinessesQuery();

  const toggleExpandedBusiness = (index: number) => {
    return setExpandedBusiness((prev) => (prev === index ? -1 : index));
  };

  if (businesses) {
    return (
      <List disablePadding>
        {businesses.businesses.map((business, index) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              index={index + 1}
              isExpanded={expandedBusiness === index}
              setExpanded={() => toggleExpandedBusiness(index)}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  if (error) return <span>Error!</span>;
  return <span>Loading...</span>;
}
