import BusinessIcon from '@mui/icons-material/Business';
import ButtonBase from '@mui/material/ButtonBase';

export interface MobileDrawerTogglerProps {
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
      onClick={() => toggleDrawer()}
      aria-label={isDrawerOpen ? 'Close drawer' : 'Open drawer'}
      sx={(theme) => ({
        backgroundColor: isDrawerOpen ? theme.palette.neutral.main : theme.palette.primary.main,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        color: isDrawerOpen
          ? theme.palette.neutral.contrastText
          : theme.palette.primary.contrastText,
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
      <BusinessIcon />
    </ButtonBase>
  );
}
