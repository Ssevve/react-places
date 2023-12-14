import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';
import { useBusinessesQuery } from '../../api';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  setCenteredBusinessId: (id: string) => void;
  toggleDrawer: (newOpen?: boolean) => void;
}

export function BusinessList({ setCenteredBusinessId, toggleDrawer }: BusinessListProps) {
  const { data: businesses } = useBusinessesQuery({ throwOnError: true });
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  if (businesses) {
    return (
      <List disablePadding aria-label="Businesses" sx={{ overflow: 'auto' }}>
        {businesses.businesses.map((business) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              isExpanded={expandedBusinessId === business.id}
              setCenteredBusinessId={setCenteredBusinessId}
              toggleDrawer={toggleDrawer}
              toggleExpanded={toggleExpanded}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  return <BusinessListSkeleton />;
}
