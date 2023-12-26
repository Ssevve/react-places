import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../api';
import { businessesPerPage } from '../../constants';
import { BusinessCard } from '../BusinessCard';
import { BusinessListPagination } from '../BusinessListPagination';
import { BusinessListSkeleton } from '../BusinessListSkeleton';

interface BusinessListProps {
  setHighlightedBusinessId: (id: string) => void;
  toggleDrawer: (newOpen?: boolean) => void;
}

export function BusinessList({ setHighlightedBusinessId, toggleDrawer }: BusinessListProps) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const city = searchParams.get('city');
  const {
    data: businessesData,
    isPending,
    fetchStatus,
  } = useBusinessesQuery({
    city,
    page: currentPage,
    throwOnError: true,
  });
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();
  const listWrapperRef = useRef<HTMLUListElement>();

  useEffect(() => {
    if (!listWrapperRef.current) return;
    listWrapperRef.current.scrollTo(0, 0);
  }, [currentPage]);

  const toggleExpanded = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  const isWaitingForInitialInput = isPending && fetchStatus === 'idle';
  if (isWaitingForInitialInput) {
    return (
      <Box textAlign="center" paddingInline={1} paddingBlock={2}>
        <DomainDisabledIcon sx={{ fontSize: 80, mb: 2, opacity: 0.4 }} />
        <Typography>We can't show any businesses before you select the city!</Typography>
      </Box>
    );
  }

  if (businessesData) {
    const businessesToRender = businessesData.businesses;
    return businessesToRender.length ? (
      <Box overflow="auto" height="100%" width="100%" ref={listWrapperRef}>
        <List
          disablePadding
          aria-label="Businesses"
          sx={{
            boxShadow: 0,
            overflow: 'auto',
          }}
        >
          {businessesToRender.map((business) => (
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
          totalBusinesses={businessesData.total}
        />
      </Box>
    ) : (
      <Box textAlign="center" paddingInline={1} paddingBlock={2}>
        <DomainDisabledIcon sx={{ fontSize: 80, mb: 2, opacity: 0.4 }} />
        <Typography>Unfortunately, there are no businesses to show.</Typography>
      </Box>
    );
  }

  return <BusinessListSkeleton />;
}
