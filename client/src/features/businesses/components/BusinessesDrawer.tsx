import { ResponsiveDrawer } from '@/components';
import { CitiesAutocomplete } from '@/features/autocomplete';
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { useBusinessesQuery } from '../hooks';
import { BusinessesContainer } from './BusinessesContainer';
import { BusinessesFilters, BusinessesFiltersOpener } from './BusinessesFilters';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { data: businessesData } = useBusinessesQuery();

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
        {!!businessesData?.businesses && <BusinessesFiltersOpener openFilters={openFilters} />}
      </Box>
      <Divider />
      <BusinessesContainer openFilters={openFilters} />
      <BusinessesFilters isOpen={showFilters} close={() => setShowFilters(false)} />
    </ResponsiveDrawer>
  );
}
