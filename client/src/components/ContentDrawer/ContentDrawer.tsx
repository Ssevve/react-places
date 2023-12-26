import { citiesPoland } from '@/data';
import { BusinessList, BusinessListErrorFallback } from '@/features/businesses';
import { useDeviceSizes } from '@/hooks';
import { Drawer } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';
import { MobileDrawerToggler } from './components/MobileDrawerToggler';

interface ContentDrawerProps {
  setHighlightedBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const togglerWidth = 50;
const togglerOffset = togglerWidth + 12;
const drawerWidth = {
  maxWidth: `calc(100% - ${togglerOffset}px)`,
  width: 425,
};

export function ContentDrawer({ setHighlightedBusinessId }: ContentDrawerProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || null);
  const [isOpen, setIsOpen] = useState(true);
  const { isMobile } = useDeviceSizes();
  const { reset } = useQueryErrorResetBoundary();

  const toggleDrawer = useCallback((newOpen?: boolean) => {
    return newOpen ? setIsOpen(newOpen) : setIsOpen((prev) => !prev);
  }, []);

  const changeSelectedCity = (city: string | null) => {
    setSelectedCity(city);
    if (!city) {
      setSearchParams((params) => {
        params.delete('city');
        return params;
      });
    } else {
      setHighlightedBusinessId(undefined);
      setSearchParams({ city });
    }
  };

  return (
    <Drawer
      data-testid="content-drawer"
      PaperProps={{
        sx: {
          ...drawerWidth,
          overflow: 'visible',
        },
      }}
      sx={drawerWidth}
      anchor="left"
      onClose={() => toggleDrawer(false)}
      open={isOpen}
      variant={isMobile ? 'temporary' : 'permanent'}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Autocomplete
        disablePortal
        value={selectedCity}
        onChange={(_, city) => changeSelectedCity(city)}
        options={citiesPoland}
        renderInput={(params) => <TextField {...params} label="Select a city" />}
        getOptionLabel={(city) => city}
      />
      <ErrorBoundary FallbackComponent={BusinessListErrorFallback} onReset={reset}>
        <BusinessList
          setHighlightedBusinessId={setHighlightedBusinessId}
          toggleDrawer={toggleDrawer}
        />
      </ErrorBoundary>
      {isMobile && (
        <MobileDrawerToggler
          isDrawerOpen={isOpen}
          width={togglerWidth}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Drawer>
  );
}
