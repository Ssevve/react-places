import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BusinessesErrorMessage } from '../BusinessesErrorMessage';
import { useBusinessesQuery } from '../..';

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
