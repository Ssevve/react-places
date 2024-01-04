import { Drawer, DrawerProps } from '@mui/material';
import { MobileDrawerToggler } from './components/MobileDrawerToggler';
import React from 'react';

interface PropsWithoutToggler {
  includeToggler?: never | false;
  toggleDrawer?: never;
  togglerIcon?: never;
}

interface PropsWithToggler {
  includeToggler: true;
  togglerIcon: React.ReactNode;
  toggleDrawer: () => void;
}

type ResponsiveDrawerProps = { isMobile: boolean; keepMounted?: boolean } & DrawerProps &
  (PropsWithToggler | PropsWithoutToggler);

const drawerWidth = 425;
const togglerWidth = 50;
const togglerOffset = togglerWidth + 12;
const drawerSx = {
  maxWidth: `calc(100% - ${togglerOffset}px)`,
  width: drawerWidth,
};

// TODO: tests - test toggler props
export function ResponsiveDrawer({
  isMobile,
  children,
  open = false,
  includeToggler = false,
  keepMounted = false,
  toggleDrawer,
  togglerIcon,
  ...props
}: ResponsiveDrawerProps) {
  const renderToggler = toggleDrawer && includeToggler && togglerIcon && isMobile;

  return (
    <Drawer
      data-testid="content-drawer"
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
        <MobileDrawerToggler
          icon={togglerIcon}
          isDrawerOpen={open}
          width={togglerWidth}
          toggleDrawer={toggleDrawer}
        />
      )}
    </Drawer>
  );
}
