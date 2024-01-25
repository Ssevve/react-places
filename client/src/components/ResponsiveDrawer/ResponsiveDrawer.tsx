import { useDeviceSizes } from '@/hooks';
import { Box, Drawer, DrawerProps } from '@mui/material';
import { MobileResponsiveDrawerToggler } from './MobileResponsiveDrawerToggler';

interface PropsWithoutToggler {
  includeToggler?: never | false;
  toggleDrawer?: never;
  togglerIcon?: never;
  togglerWidth?: never;
}

interface PropsWithToggler {
  includeToggler: true;
  togglerIcon?: React.ReactNode;
  toggleDrawer: () => void;
  togglerWidth?: number;
}

export type ResponsiveDrawerProps = {
  drawerWidth?: number;
  keepMounted?: boolean;
} & DrawerProps &
  (PropsWithToggler | PropsWithoutToggler);

const DRAWER_WIDTH = 425;
const TOGGLER_WIDTH = 50;
const TOGGLER_SCREEN_EDGE_MARGIN = 12;

const togglerOffset = TOGGLER_WIDTH + TOGGLER_SCREEN_EDGE_MARGIN;

export function ResponsiveDrawer({
  children,
  open = true,
  includeToggler = false,
  keepMounted = false,
  toggleDrawer,
  togglerIcon,
  ...props
}: ResponsiveDrawerProps) {
  const { isMobile } = useDeviceSizes();
  const renderToggler = includeToggler && isMobile;

  return (
    <Box width={DRAWER_WIDTH} position={isMobile ? 'fixed' : 'static'}>
      <Drawer
        data-testid="responsive-drawer"
        PaperProps={{
          sx: {
            maxWidth: `calc(100% - ${togglerOffset}px)`,
            overflow: 'visible',
            width: DRAWER_WIDTH,
          },
        }}
        ModalProps={{
          keepMounted,
        }}
        open={open}
        variant={isMobile ? 'temporary' : 'permanent'}
        {...props}
      >
        {children}
        {renderToggler && (
          <MobileResponsiveDrawerToggler
            icon={togglerIcon}
            isDrawerOpen={open}
            width={TOGGLER_WIDTH}
            toggleDrawer={toggleDrawer}
          />
        )}
      </Drawer>
    </Box>
  );
}
