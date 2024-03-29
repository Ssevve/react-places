import { BusinessCard, Business } from '@/features/businesses';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';

export interface BusinessesListProps {
  businesses: Array<Business>;
}

export function BusinessesList({ businesses }: BusinessesListProps) {
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();

  const toggleExpandedBusiness = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  return (
    <List
      disablePadding
      aria-label="Businesses"
      sx={{
        boxShadow: 0,
      }}
    >
      {businesses.map((business) => (
        <ListItem key={business.id} disablePadding disableGutters>
          <BusinessCard
            business={business}
            isExpanded={expandedBusinessId === business.id}
            toggleExpandedBusiness={toggleExpandedBusiness}
          />
        </ListItem>
      ))}
    </List>
  );
}
