import Button from '@mui/material/Button';

interface FiltersToggleProps {
  setFilters: () => void;
  closeFilters: () => void;
}

export function BusinessesFiltersSetButton({ setFilters, closeFilters }: FiltersToggleProps) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        setFilters();
        closeFilters();
      }}
    >
      Set Filters
    </Button>
  );
}
