import { useDeviceSizes } from '@/hooks';
import { Drawer, DrawerProps } from '@mui/material';
import React from 'react';
import { MobileResponsiveDrawerToggler } from './components/MobileResponsiveDrawerToggler';

interface PropsWithoutToggler {
  includeToggler?: never | false;
  toggleDrawer?: never;
  togglerIcon?: never;
}

interface PropsWithToggler {
  includeToggler: true;
  togglerIcon?: React.ReactNode;
  toggleDrawer: () => void;
}

export type ResponsiveDrawerProps = {
  keepMounted?: boolean;
} & DrawerProps &
  (PropsWithToggler | PropsWithoutToggler);

const drawerWidth = 425;
const togglerWidth = 50;
const togglerOffset = togglerWidth + 12;
const drawerSx = {
  maxWidth: `calc(100% - ${togglerOffset}px)`,
  width: drawerWidth,
};

export function ResponsiveDrawer({
  children,
  open = false,
  includeToggler = false,
  keepMounted = false,
  toggleDrawer,
  togglerIcon,
  ...props
}: ResponsiveDrawerProps) {
  const { isMobile } = useDeviceSizes();
  const renderToggler = toggleDrawer && includeToggler && isMobile;

  return (
    <Drawer
      data-testid="responsive-drawer"
      PaperProps={{
        sx: {
          ...drawerSx,
          overflow: 'visible',
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
          width={togglerWidth}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Drawer>
  );
}
