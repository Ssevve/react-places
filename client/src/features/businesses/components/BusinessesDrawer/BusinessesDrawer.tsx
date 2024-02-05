import { ResponsiveDrawer } from '@/components';
import { CitiesAutocomplete, City, useCitiesQuery } from '@/features/cities';
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BusinessesContainer } from '../BusinessesContainer';
import { BusinessesFilters, BusinessesFiltersOpener } from '../BusinessesFilters';
import { BusinessesSortSelect } from '../BusinessesSortSelect';

export function BusinessesDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCity = searchParams.get('city') || '';
  const previousCity = useRef('');
  const [search, setSearch] = useState(currentCity);
  const {
    data: cities,
    isLoading: isCitiesQueryLoading,
    isError: isCitiesQueryError,
  } = useCitiesQuery({ query: search });

  const openFilters = () => setShowFilters(true);

  const handleCityChange = (city: City | null) => {
    searchParams.delete('page');
    previousCity.current = currentCity;
    if (!city) {
      setSearch('');
      setSearchParams((params) => {
        params.delete('city');
        return params;
      });
    } else {
      setSearch(city.name);
      searchParams.set('city', city.name);
      setSearchParams(searchParams, { replace: true });
    }
  };

  const cityChanged = currentCity !== previousCity.current;

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
      <Box data-testid="businesses-drawer-controls" paddingX={1} paddingY={2} gap={2} display="grid">
        <CitiesAutocomplete
          search={search}
          setSearch={setSearch}
          isLoading={isCitiesQueryLoading}
          isError={isCitiesQueryError}
          cities={cities || []}
          onCityChange={handleCityChange}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
          <BusinessesFiltersOpener openFilters={openFilters} />
          <BusinessesSortSelect />
        </Box>
      </Box>
      <Divider />
      <BusinessesContainer openFilters={openFilters} search={search} cityChanged={cityChanged} />
      <BusinessesFilters isOpen={showFilters} close={() => setShowFilters(false)} />
    </ResponsiveDrawer>
  );
}
