import { ResponsiveDrawer } from '@/components/ResponsiveDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BusinessesFiltersPrice } from './components';

export interface BusinessesFiltersProps {
  isOpen: boolean;
  close: () => void;
}

export function BusinessesFilters({ isOpen, close }: BusinessesFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceFilters, setPriceFilters] = useState(searchParams.get('price')?.split(',') || []);

  const setFilters = () => {
    if (priceFilters.length === 0) searchParams.delete('price');
    else searchParams.set('price', priceFilters.join(','));

    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  return (
    <ResponsiveDrawer open={isOpen} variant="temporary" onClose={close} hideBackdrop>
      <Box paddingX={1} paddingY={2} gap={6} display="grid">
        <Box display="flex" alignItems="center" justifyContent="start" gap={1}>
          <IconButton aria-label="close filters" onClick={close}>
            <CloseIcon />
          </IconButton>
          <Typography component="h2" variant="h6">
            Filters
          </Typography>
        </Box>
        <Box display="grid" gap={2}>
          <BusinessesFiltersPrice priceFilters={priceFilters} setPriceFilters={setPriceFilters} />
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            setFilters();
            close();
          }}
        >
          Set Filters
        </Button>
      </Box>
    </ResponsiveDrawer>
  );
}
