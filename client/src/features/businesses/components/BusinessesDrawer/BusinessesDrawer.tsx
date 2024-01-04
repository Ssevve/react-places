import {
  BusinessesErrorFallback,
  Businesses,
  BusinessesFilters,
  useBusinessesQuery,
} from '@/features/businesses';
import { CitiesAutocomplete } from '@/features/cities';
import Box from '@mui/material/Box';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ResponsiveDrawer } from '@/components';
import TuneIcon from '@mui/icons-material/Tune';
import { useDeviceSizes } from '@/hooks';
import { Button } from '@mui/material';

interface BusinessesDrawerProps {
  setHighlightedBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// TODO: tests
export function BusinessesDrawer({ setHighlightedBusinessId }: BusinessesDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { isMobile } = useDeviceSizes();
  const { reset } = useQueryErrorResetBoundary();
  const { data: businessesData } = useBusinessesQuery();

  const closeFilters = useCallback(() => setShowFilters(false), []);
  const toggleDrawer = useCallback((newOpen?: boolean) => {
    setShowFilters(false);
    return newOpen ? setIsOpen(newOpen) : setIsOpen((prev) => !prev);
  }, []);

  return (
    <ResponsiveDrawer
      isMobile={isMobile}
      data-testid="businesses-drawer"
      onClose={() => setIsOpen(false)}
      open={isOpen}
      keepMounted
    >
      <Box paddingX={1} marginTop={2}>
        <CitiesAutocomplete setHighlightedBusinessId={setHighlightedBusinessId} />
      </Box>
      <ErrorBoundary FallbackComponent={BusinessesErrorFallback} onReset={reset}>
        {businessesData?.businesses && (
          <Box paddingX={1} marginBlock={2}>
            <Button
              onClick={() => setShowFilters(true)}
              endIcon={<TuneIcon />}
              variant="outlined"
              color="inherit"
              sx={{
                borderRadius: 6,
                width: 'max-content',
              }}
            >
              Filters
            </Button>
          </Box>
        )}
        <BusinessesFilters isOpen={showFilters} close={closeFilters} />
        <Businesses
          setHighlightedBusinessId={setHighlightedBusinessId}
          toggleDrawer={toggleDrawer}
        />
      </ErrorBoundary>
    </ResponsiveDrawer>
  );
}
