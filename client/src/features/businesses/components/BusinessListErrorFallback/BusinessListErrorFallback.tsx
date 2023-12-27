import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BusinessesErrorMessage } from '../BusinessesErrorMessage';

interface BusinessListFallbackProps {
  resetErrorBoundary: () => void;
}

export function BusinessListErrorFallback({ resetErrorBoundary }: BusinessListFallbackProps) {
  return (
    <Box role="alert" display="grid" justifyContent="center" paddingX={2} textAlign="center">
      <BusinessesErrorMessage message="Couldn't load businesses. Please try again." />
      <Button variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Box>
  );
}
