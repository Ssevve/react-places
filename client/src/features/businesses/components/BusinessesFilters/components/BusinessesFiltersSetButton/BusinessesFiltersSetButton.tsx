import Button from '@mui/material/Button';

interface FiltersToggleProps {
  setFilters: () => void;
}

export function BusinessesFiltersSetButton({ setFilters }: FiltersToggleProps) {
  return (
    <Button variant="contained" onClick={setFilters}>
      Set Filters
    </Button>
  );
}
