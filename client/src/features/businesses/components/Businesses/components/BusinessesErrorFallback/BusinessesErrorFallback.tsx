import { BusinessesErrorMessage, useBusinessesQuery } from '@/features/businesses';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function BusinessesErrorFallback() {
  const { refetch } = useBusinessesQuery({ enabled: false });
  return (
    <Box role="alert" display="grid" justifyContent="center" paddingX={2} textAlign="center">
      <BusinessesErrorMessage message="Couldn't load businesses. Please try again." />
      <Button variant="contained" onClick={() => refetch()}>
        Try again
      </Button>
    </Box>
  );
}
