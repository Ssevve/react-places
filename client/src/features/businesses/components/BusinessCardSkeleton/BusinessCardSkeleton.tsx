import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function BusinessCardSkeleton() {
  return (
    <Box padding="1rem" display="flex" gap="1rem" height={180}>
      <Skeleton width="6rem" height="6rem" variant="rounded" animation="wave" />
      <Box display="flex" flexDirection="column" gap="0.5rem">
        <Skeleton width={175} animation="wave" />
        <Skeleton width={100} animation="wave" />
        <Skeleton width={200} animation="wave" />
        <Skeleton width={150} animation="wave" />
      </Box>
    </Box>
  );
}
