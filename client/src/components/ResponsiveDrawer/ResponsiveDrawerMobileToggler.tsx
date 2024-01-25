import ButtonBase from '@mui/material/ButtonBase';

export interface ResponsiveDrawerMobileTogglerProps {
  isDrawerOpen: boolean;
  width: number;
  icon?: React.ReactNode;
  toggleDrawer: (() => void) | undefined;
}

export function ResponsiveDrawerMobileToggler({
  width,
  icon,
  isDrawerOpen,
  toggleDrawer,
}: ResponsiveDrawerMobileTogglerProps) {
  return (
    <ButtonBase
      onClick={toggleDrawer}
      aria-label={isDrawerOpen ? 'close drawer' : 'open drawer'}
      sx={(theme) => ({
        backgroundColor: isDrawerOpen ? theme.palette.neutral.main : theme.palette.primary.main,
        borderBottomRightRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        color: isDrawerOpen ? theme.palette.neutral.contrastText : theme.palette.primary.contrastText,
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
      {icon}
    </ButtonBase>
  );
}
