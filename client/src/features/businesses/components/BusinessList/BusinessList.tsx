import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useBusinessesQuery } from '../../api';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  hoveredBusinessId: string | undefined;
  toggleHoveredBusiness: (id: string) => void;
  toggleExpandedBusiness: (id: string) => void;
  expandedBusinessId: string | undefined;
}

export function BusinessList({
  hoveredBusinessId,
  toggleHoveredBusiness,
  expandedBusinessId,
  toggleExpandedBusiness,
}: BusinessListProps) {
  const { data: businesses } = useBusinessesQuery({ throwOnError: true });

  if (businesses) {
    return (
      <List disablePadding aria-label="Business list">
        {businesses.businesses.map((business, index) => (
          <ListItem key={business.id} disablePadding disableGutters>
            <BusinessCard
              business={business}
              index={index}
              isExpanded={expandedBusinessId === business.id}
              toggleExpanded={toggleExpandedBusiness}
              isHovered={hoveredBusinessId === business.id}
              toggleHovered={toggleHoveredBusiness}
            />
          </ListItem>
        ))}
      </List>
    );
  }

  return <BusinessListSkeleton />;
}
