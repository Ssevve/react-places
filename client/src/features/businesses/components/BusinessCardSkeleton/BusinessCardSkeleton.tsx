import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function BusinessCardSkeleton() {
  return (
    <Box padding={2} display="flex" gap={2} height={180}>
      <Skeleton width={96} height={96} variant="rounded" animation="wave" />
      <Box display="flex" flexDirection="column" gap={1}>
        <Skeleton width={175} animation="wave" />
        <Skeleton width={100} animation="wave" />
        <Skeleton width={200} animation="wave" />
        <Skeleton width={150} animation="wave" />
      </Box>
    </Box>
  );
}
