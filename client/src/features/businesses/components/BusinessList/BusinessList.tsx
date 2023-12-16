import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../api';
import { businessesPerPage } from '../../constants';
import { BusinessCard } from '../BusinessCard';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  setCenteredBusinessId: (id: string) => void;
  toggleDrawer: (newOpen?: boolean) => void;
}

export function BusinessList({ setCenteredBusinessId, toggleDrawer }: BusinessListProps) {
  const { data: businesses } = useBusinessesQuery({ throwOnError: true });
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  const pageCount = businesses?.total ? Math.ceil(businesses?.total / businessesPerPage) : 1;

  if (businesses) {
    return (
      <Box overflow="auto">
        <List disablePadding aria-label="Businesses" sx={{ boxShadow: 0 }}>
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
        <Box display="flex" justifyContent="center">
          <Pagination
            defaultPage={1}
            page={currentPage}
            onChange={(_, newPage) => setSearchParams({ page: newPage.toString() })}
            count={pageCount}
            shape="rounded"
            sx={{ px: 1, py: 2 }}
          />
        </Box>
      </Box>
    );
  }

  return <BusinessListSkeleton />;
}
