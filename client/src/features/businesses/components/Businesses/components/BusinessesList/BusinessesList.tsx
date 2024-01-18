import { BusinessCard, TransformedBusiness } from '@/features/businesses';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';

export interface BusinessesListProps {
  businesses: Array<TransformedBusiness>;
}

export function BusinessesList({ businesses }: BusinessesListProps) {
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();

  const toggleExpandedBusinessCard = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  return (
    <>
      <List
        disablePadding
        aria-label="Businesses"
        sx={{
          boxShadow: 0,
          overflow: 'auto',
        }}
      >
        {businesses.map((business) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              isExpanded={expandedBusinessId === business.id}
              toggleExpanded={toggleExpandedBusinessCard}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
