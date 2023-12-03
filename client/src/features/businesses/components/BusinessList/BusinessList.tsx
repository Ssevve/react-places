import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';
import { useBusinessesQuery } from '../../api';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

export function BusinessList() {
  const [expandedBusiness, setExpandedBusiness] = useState<string>();
  const { data: businesses } = useBusinessesQuery();

  const toggleExpandedBusiness = useCallback((id: string) => {
    return setExpandedBusiness((prevId) => (prevId === id ? undefined : id));
  }, []);

  if (businesses) {
    return (
      <List disablePadding aria-label="Business list">
        {businesses.businesses.map((business, index) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              index={index}
              isExpanded={expandedBusiness === business.id}
              setExpanded={toggleExpandedBusiness}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  return <BusinessListSkeleton />;
}
