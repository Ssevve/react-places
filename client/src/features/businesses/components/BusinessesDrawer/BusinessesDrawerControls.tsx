import { CitiesAutocomplete } from '@/features/cities';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BusinessesFiltersOpener } from '../BusinessesFilters';
import { BusinessesSortSelect } from '../BusinessesSortSelect';

export interface BusinessesDrawerControlsProps {
  fetchBusinesses: () => void;
  openFilters: () => void;
  resetSearch: () => void;
  isSearchDisabled: boolean;
  isFetchSuccess: boolean;
  isFetchInitialized: boolean;
}

export function BusinessesDrawerControls({
  fetchBusinesses,
  resetSearch,
  openFilters,
  isSearchDisabled,
  isFetchSuccess,
  isFetchInitialized,
}: BusinessesDrawerControlsProps) {
  return (
    <Box data-testid="businesses-drawer-controls" paddingX={1} paddingY={2} gap={2} display="grid">
      <CitiesAutocomplete disabled={isFetchInitialized} />
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <BusinessesFiltersOpener openFilters={openFilters} />
        <BusinessesSortSelect />
      </Box>
      {isFetchSuccess ? (
        <Button size="large" variant="outlined" onClick={resetSearch}>
          Change city
        </Button>
      ) : (
        <Button disabled={isSearchDisabled} size="large" variant="contained" onClick={fetchBusinesses}>
          Search
        </Button>
      )}
    </Box>
  );
}
