import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';

interface OpenerType extends Pick<ButtonProps, 'sx' | 'variant'> {}

const openerTypes: Record<string, OpenerType> = {
  button: {
    sx: {
      borderRadius: 6,
      paddingX: 3,
      width: 'max-content',
    },
    variant: 'outlined',
  },
  text: {
    sx: {
      '&:hover': { background: 'inherit', textDecoration: 'underline' },
      color: 'primary.main',
    },
    variant: 'text',
  },
};

interface BusinessesFiltersOpenerProps extends Pick<ButtonProps, 'size'>, React.PropsWithChildren {
  openFilters: () => void;
  type?: 'button' | 'text';
}

export function BusinessesFiltersOpener({
  openFilters,
  type = 'button',
  size = 'medium',
  children,
}: BusinessesFiltersOpenerProps) {
  return (
    <Button
      onClick={openFilters}
      endIcon={type === 'text' ? null : <TuneIcon />}
      variant={openerTypes[type].variant}
      size={size}
      color="inherit"
      sx={{ height: 'max-content', ...openerTypes[type].sx }}
    >
      {children || (
        <Typography component="span" fontSize="small">
          Filters
        </Typography>
      )}
    </Button>
  );
}
