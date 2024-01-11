import { ResponsiveDrawer } from '@/components/ResponsiveDrawer';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { radiusOptions } from '../../constants';
import {
  BusinessesFiltersPrice,
  BusinessesFiltersRadius,
  BusinessesFiltersSetButton,
} from './components';

export interface BusinessesFiltersProps {
  isOpen: boolean;
  close: () => void;
}

export function BusinessesFilters({ isOpen, close }: BusinessesFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prices, setPrices] = useState(searchParams.get('price')?.split(',') || []);
  const [radius, setRadius] = useState(Number(searchParams.get('radius')) || radiusOptions.default);

  const setFilters = useCallback(() => {
    if (prices.length === 0) searchParams.delete('price');
    else searchParams.set('price', prices.join(','));

    if (radius) searchParams.set('radius', radius.toString());
    else searchParams.delete('radius');

    searchParams.delete('page');
    setSearchParams(searchParams, {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, radius]);

  return (
    <ResponsiveDrawer
      open={isOpen}
      variant="temporary"
      onClose={close}
      hideBackdrop
      sx={{
        minHeight: '100vh',
      }}
    >
      <Box paddingX={1} paddingY={2} display="grid" overflow="auto" position="relative">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap={1}
          position="fixed"
          padding={1}
          sx={{
            backgroundColor: 'white',
          }}
        >
          <IconButton aria-label="close filters" onClick={close}>
            <CloseIcon />
          </IconButton>
          <Typography component="h2" variant="h6">
            Filters
          </Typography>
        </Box>
        <Box display="grid" gap={2} paddingX={1} marginTop={6}>
          <BusinessesFiltersPrice prices={prices} setPrices={setPrices} />
          <BusinessesFiltersRadius radius={radius} setRadius={setRadius} />
          <BusinessesFiltersSetButton setFilters={setFilters} closeFilters={close} />
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
}
