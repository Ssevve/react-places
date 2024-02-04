import { ResponsiveDrawer } from '@/components';
import { CitiesAutocomplete } from '@/features/cities';
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { BusinessesContainer } from './BusinessesContainer';
import { BusinessesFilters, BusinessesFiltersOpener } from './BusinessesFilters';
import { BusinessesSortSelect } from './BusinessesSortSelect';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const openFilters = () => setShowFilters(true);

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
      <Box paddingX={1} paddingY={2} gap={2} display="grid">
        <CitiesAutocomplete />
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
          <BusinessesFiltersOpener openFilters={openFilters} />
          <BusinessesSortSelect />
        </Box>
      </Box>
      <Divider />
      <BusinessesContainer openFilters={openFilters} />
      <BusinessesFilters isOpen={showFilters} close={() => setShowFilters(false)} />
    </ResponsiveDrawer>
  );
}
