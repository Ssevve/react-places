import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../api';
import { businessesPerPage } from '../../constants';
import { BusinessCard } from '../BusinessCard';
import { BusinessListPagination } from '../BusinessListPagination';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  setCenteredBusinessId: (id: string) => void;
  toggleDrawer: (newOpen?: boolean) => void;
}

export function BusinessList({ setCenteredBusinessId, toggleDrawer }: BusinessListProps) {
  const { data: businesses } = useBusinessesQuery({ throwOnError: true });
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const listWrapperRef = useRef<HTMLUListElement>();

  useEffect(() => {
    if (!listWrapperRef.current) return;
    listWrapperRef.current.scrollTo(0, 0);
  }, [currentPage]);

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  if (businesses) {
    return (
      <Box overflow="auto" height="100%" width="100%" ref={listWrapperRef}>
        <List
          disablePadding
          aria-label="Businesses"
          sx={{
            boxShadow: 0,
            overflow: 'auto',
          }}
        >
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
        <Divider />
        <BusinessListPagination
          businessesPerPage={businessesPerPage}
          currentPage={currentPage}
          totalBusinesses={businesses.total}
        />
      </Box>
    );
  }

  return <BusinessListSkeleton />;
}
