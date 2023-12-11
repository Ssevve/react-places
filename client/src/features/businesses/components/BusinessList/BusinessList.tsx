import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';
import { useBusinessesQuery } from '../../api';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  hoveredBusinessId: string | undefined;
  toggleHoveredBusiness: (id: string) => void;
  setCenteredBusinessId: (id: string) => void;
}

export function BusinessList({
  hoveredBusinessId,
  toggleHoveredBusiness,
  setCenteredBusinessId,
}: BusinessListProps) {
  const { data: businesses } = useBusinessesQuery({ throwOnError: true });
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  if (businesses) {
    return (
      <List disablePadding aria-label="Business list">
        {businesses.businesses.map((business, index) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              index={index}
              isExpanded={expandedBusinessId === business.id}
              setCenteredBusinessId={setCenteredBusinessId}
              isHovered={hoveredBusinessId === business.id}
              toggleHovered={toggleHoveredBusiness}
              toggleExpanded={toggleExpanded}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  return <BusinessListSkeleton />;
}
