import Box from '@mui/material/Box';
import { BusinessCardSkeleton } from './BusinessCard';

export function BusinessesSkeleton() {
  return (
    <Box height={1} overflow="hidden" aria-busy="true" aria-live="polite" role="progressbar">
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
    </Box>
  );
}
