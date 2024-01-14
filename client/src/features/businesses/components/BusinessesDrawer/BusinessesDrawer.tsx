import { ResponsiveDrawer } from '@/components';
import { Businesses, BusinessesFilters } from '@/features/businesses';
import { CitiesAutocomplete } from '@/features/cities';
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import { useState } from 'react';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

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
      <Box paddingX={1} paddingY={2}>
        <CitiesAutocomplete />
      </Box>
      <Businesses openFilters={() => setShowFilters(true)} />
      <BusinessesFilters isOpen={showFilters} close={() => setShowFilters(false)} />
    </ResponsiveDrawer>
  );
}
