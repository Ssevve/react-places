import { BusinessList, BusinessListErrorFallback } from '@/features/businesses';
import { useDeviceSizes } from '@/hooks';
import { Drawer } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MobileDrawerToggler } from './components/MobileDrawerToggler';

interface ContentDrawerProps {
  setCenteredBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const togglerWidth = 50;
const togglerOffset = togglerWidth + 12;
const drawerWidth = {
  maxWidth: `calc(100% - ${togglerOffset}px)`,
  width: 425,
};

export function ContentDrawer({ setCenteredBusinessId }: ContentDrawerProps) {
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
      <ErrorBoundary FallbackComponent={BusinessListErrorFallback} onReset={reset}>
        <BusinessList setCenteredBusinessId={setCenteredBusinessId} toggleDrawer={toggleDrawer} />
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
