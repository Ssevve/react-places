import Button from '@mui/material/Button';

interface BusinessesFiltersSetButtonProps {
  setFilters: () => void;
  closeFilters: () => void;
}

export function BusinessesFiltersSetButton({ setFilters, closeFilters }: BusinessesFiltersSetButtonProps) {
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
