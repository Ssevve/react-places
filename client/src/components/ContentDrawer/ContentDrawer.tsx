import { BusinessList, BusinessListErrorFallback } from '@/features/businesses';
import StoreIcon from '@mui/icons-material/Store';
import { ButtonBase, Drawer, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface MobileDrawerTogglerProps {
  isOpen: boolean;
}

const togglerWidth = 50;
const MobileDrawerToggler = styled(ButtonBase)<MobileDrawerTogglerProps>(({ theme, isOpen }) => ({
  backgroundColor: isOpen ? '#d3d3d3' : theme.palette.primary.main,
  borderBottomRightRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  color: isOpen ? 'inherit' : 'white',
  cursor: 'pointer',
  height: 150,
  position: 'absolute',
  right: -togglerWidth,
  top: '50%',
  transition: theme.transitions.create('background-color'),
  translate: '0 -50%',
  visibility: 'visible',
  width: togglerWidth,
}));

interface ContentDrawerProps {
  setCenteredBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const togglerOffset = togglerWidth + 12;
const drawerWidth = {
  maxWidth: `calc(100% - ${togglerOffset}px)`,
  width: 425,
};

export function ContentDrawer({ setCenteredBusinessId }: ContentDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { reset } = useQueryErrorResetBoundary();

  const toggleDrawer = useCallback((newOpen?: boolean) => {
    return newOpen ? setIsOpen(newOpen) : setIsOpen((prev) => !prev);
  }, []);

  return (
    <Drawer
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
        <MobileDrawerToggler onClick={() => toggleDrawer()} isOpen={isOpen}>
          <StoreIcon />
        </MobileDrawerToggler>
      )}
    </Drawer>
  );
}
