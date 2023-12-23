import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BusinessListFallbackProps {
  resetErrorBoundary: () => void;
}

export function BusinessListErrorFallback({ resetErrorBoundary }: BusinessListFallbackProps) {
  return (
    <Box role="alert" display="grid" justifyContent="center" gap={2} padding={2} textAlign="center">
      <DomainDisabledIcon sx={{ fontSize: 80, mx: 'auto', opacity: 0.4 }} />
      <Typography component="p">Couldn't load businesses</Typography>
      <Button variant="contained" size="small" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
}
