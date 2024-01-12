import { ResponsiveDrawer } from '@/components';
import { Businesses, BusinessesFilters } from '@/features/businesses';
import { CitiesAutocomplete } from '@/features/cities';
import Box from '@mui/material/Box';
import { useCallback, useState } from 'react';
import ListIcon from '@mui/icons-material/List';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const openFilters = useCallback(() => setShowFilters(true), []);
  const closeFilters = useCallback(() => setShowFilters(false), []);
  const toggleBusinessesDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <ResponsiveDrawer
      data-testid="businesses-drawer"
      onClose={() => setIsOpen(false)}
      open={isOpen}
      includeToggler
      toggleDrawer={toggleBusinessesDrawer}
      togglerIcon={<ListIcon fontSize="large" />}
      keepMounted
    >
      <Box paddingX={1} paddingY={2}>
        <CitiesAutocomplete />
      </Box>
      <Businesses openFilters={openFilters} />
      <BusinessesFilters isOpen={showFilters} close={closeFilters} />
    </ResponsiveDrawer>
  );
}
