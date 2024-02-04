import { ResponsiveDrawer } from '@/components';
import ListIcon from '@mui/icons-material/List';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusinessesQuery } from '../../hooks';
import { BusinessesContainer } from '../BusinessesContainer';
import { BusinessesFilters } from '../BusinessesFilters';
import { BusinessesDrawerControls } from './BusinessesDrawerControls';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading: isLoadingBusinesses,
    isSuccess: isSuccessBusinesses,
    refetch: refetchBusinesses,
  } = useBusinessesQuery();

  const fetchBusinesses = () => {
    refetchBusinesses();
    searchParams.set('shouldFetch', 'true');
    setSearchParams(searchParams);
  };

  const resetSearch = () => {
    searchParams.delete('shouldFetch');
    setSearchParams(searchParams);
  };

  const openFilters = () => setShowFilters(true);

  const isSearchDisabled = isLoadingBusinesses || !searchParams.get('city');

  return (
    <ResponsiveDrawer
      data-testid="businesses-drawer"
      onClose={() => setIsOpen(false)}
      open={isOpen}
      includeToggler
      toggleDrawer={() => setIsOpen((prev) => !prev)}
      togglerIcon={<ListIcon fontSize="large" />}
      keepMounted
    >
      <BusinessesDrawerControls
        isFetchSuccess={isSuccessBusinesses}
        isFetchInitialized={!!searchParams.get('shouldFetch')}
        isSearchDisabled={isSearchDisabled}
        resetSearch={resetSearch}
        fetchBusinesses={fetchBusinesses}
        openFilters={openFilters}
      />
      <Divider />
      <BusinessesContainer openFilters={openFilters} />
      <BusinessesFilters isOpen={showFilters} close={() => setShowFilters(false)} />
    </ResponsiveDrawer>
  );
}
