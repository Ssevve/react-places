import { BusinessListErrorFallback, Businesses } from '@/features/businesses';
import { CitiesAutocomplete } from '@/features/cities';
import { useDeviceSizes } from '@/hooks';
import { Drawer } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
  const [isOpen, setIsOpen] = useState(true);
  const { isMobile } = useDeviceSizes();
  const { reset } = useQueryErrorResetBoundary();

  const toggleDrawer = useCallback((newOpen?: boolean) => {
    return newOpen ? setIsOpen(newOpen) : setIsOpen((prev) => !prev);
  }, []);

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
      <CitiesAutocomplete setHighlightedBusinessId={setHighlightedBusinessId} />
      <ErrorBoundary FallbackComponent={BusinessListErrorFallback} onReset={reset}>
        <Businesses
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
