import ButtonBase from '@mui/material/ButtonBase';
import StoreIcon from '@mui/icons-material/Store';

interface MobileDrawerTogglerProps {
  isDrawerOpen: boolean;
  width: number;
  toggleDrawer: () => void;
}

export function MobileDrawerToggler({
  width,
  isDrawerOpen,
  toggleDrawer,
}: MobileDrawerTogglerProps) {
  return (
    <ButtonBase
      data-testid="mobile-drawer-toggler"
      onClick={() => toggleDrawer()}
      aria-label={isDrawerOpen ? 'Close drawer' : 'Open drawer'}
      sx={(theme) => ({
        backgroundColor: isDrawerOpen ? '#d3d3d3' : theme.palette.primary.main,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        color: isDrawerOpen ? 'inherit' : 'white',
        cursor: 'pointer',
        height: 150,
        position: 'absolute',
        right: -width,
        top: '50%',
        transition: theme.transitions.create('background-color'),
        translate: '0 -50%',
        visibility: 'visible',
        width,
      })}
    >
      <StoreIcon />
    </ButtonBase>
  );
}
