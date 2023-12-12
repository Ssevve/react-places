import Box from '@mui/material/Box';
import { BusinessCardSkeleton } from '../BusinessCardSkeleton';

export function BusinessListSkeleton() {
  return (
    <Box height="100%" overflow="hidden" aria-busy="true" aria-live="polite" role="progressbar">
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
    </Box>
  );
}
