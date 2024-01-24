import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BusinessesErrorMessage } from './BusinessesErrorMessage';

export interface BusinessesFetchErrorProps {
  refetch: () => Promise<unknown>;
}

export function BusinessesFetchError({ refetch }: BusinessesFetchErrorProps) {
  return (
    <Box
      data-testid="businesses-fetch-error"
      role="alert"
      display="grid"
      justifyContent="center"
      paddingX={2}
      textAlign="center"
    >
      <BusinessesErrorMessage message="Couldn't load businesses. Please try again." />
      <Button variant="contained" onClick={() => refetch()}>
        Try again
      </Button>
    </Box>
  );
}
