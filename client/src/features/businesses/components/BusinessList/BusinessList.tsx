import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState } from 'react';
import { useBusinessesQuery } from '../../api/useBusinessesQuery';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

export function BusinessList() {
  const [expandedBusiness, setExpandedBusiness] = useState(-1);

  const { data: businesses } = useBusinessesQuery();

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

  return <BusinessListSkeleton />;
}
