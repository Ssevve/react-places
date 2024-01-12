import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { businessesPerPage } from '../../constants';
import { TransformedBusiness } from '../../types';
import { BusinessCard } from '../BusinessCard';
import { BusinessListPagination } from '../BusinessListPagination';

export interface BusinessListProps {
  totalBusinesses: number;
  businesses: Array<TransformedBusiness>;
}

export function BusinessList({ totalBusinesses, businesses }: BusinessListProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();
  const pageCount = totalBusinesses ? Math.ceil(totalBusinesses / businessesPerPage) : 1;

  const toggleExpanded = useCallback((id: string) => {
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
              toggleExpanded={toggleExpanded}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" paddingY={2} paddingX={1}>
          <BusinessListPagination currentPage={currentPage} pageCount={pageCount} />
        </Box>
      )}
    </>
  );
}
