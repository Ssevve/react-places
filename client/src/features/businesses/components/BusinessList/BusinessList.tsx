import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TransformedBusiness } from '../..';
import { businessesPerPage } from '../../constants';
import { BusinessCard } from '../BusinessCard';
import { BusinessListPagination } from '../BusinessListPagination';
import { BusinessListSkeleton } from '../BusinessListSkeleton';
import { BusinessesErrorMessage } from '../BusinessesErrorMessage/BusinessesErrorMessage';

interface BusinessListProps {
  setHighlightedBusinessId: (id: string) => void;
  toggleDrawer: (newOpen?: boolean) => void;
  currentPage: number;
  totalBusinesses: number;
  businesses: Array<TransformedBusiness> | undefined;
}

export function BusinessList({
  setHighlightedBusinessId,
  toggleDrawer,
  currentPage,
  totalBusinesses,
  businesses,
}: BusinessListProps) {
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();
  const listWrapperRef = useRef<HTMLUListElement>();

  useEffect(() => {
    if (!listWrapperRef.current) return;
    listWrapperRef.current.scrollTo(0, 0);
  }, [currentPage]);

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  if (businesses) {
    return businesses.length ? (
      <Box overflow="auto" height="100%" width="100%" ref={listWrapperRef}>
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
                setHighlightedBusinessId={setHighlightedBusinessId}
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
          totalBusinesses={totalBusinesses}
        />
      </Box>
    ) : (
      <BusinessesErrorMessage message="Unfortunately, there are no businesses to show." />
    );
  }

  return <BusinessListSkeleton />;
}
