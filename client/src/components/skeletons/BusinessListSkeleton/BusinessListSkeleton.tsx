import { BusinessCardSkeleton } from '@/components/skeletons/BusinessCardSkeleton';
import Box from '@mui/material/Box';

export function BusinessListSkeleton() {
  return (
    <Box height="100%" overflow="hidden">
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
      <BusinessCardSkeleton />
    </Box>
  );
}
