import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function BusinessCardSkeleton() {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box padding={2} display="flex" flexDirection={isSmallMobile ? 'column' : 'row'} gap={2}>
      <Skeleton width={isSmallMobile ? 1 : 96} height={96} variant="rounded" />
      <Box display="flex" flexDirection="column" gap={1}>
        <Skeleton width={175} />
        <Skeleton width={100} />
        <Skeleton width={200} />
        <Skeleton width={150} />
      </Box>
    </Box>
  );
}
