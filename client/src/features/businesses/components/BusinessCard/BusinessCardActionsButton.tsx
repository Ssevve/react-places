import Button, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BusinessCardActionsButtonProps extends MuiButtonProps {
  label: string;
}

// TODO: tests
export function BusinessCardActionsButton({ onClick, label, ...props }: BusinessCardActionsButtonProps) {
  return (
    <Button
      onClick={onClick}
      {...props}
      sx={{
        '&:hover': { backgroundColor: 'transparent' },
        '.MuiButton-endIcon': {
          marginLeft: 0.25,
        },
        '.MuiButton-startIcon': {
          marginRight: 0.25,
        },
        p: 0,
      }}
    >
      <Typography component="span" variant="subtitle2" fontSize={12} textTransform="none" lineHeight={0}>
        {label}
      </Typography>
    </Button>
  );
}
