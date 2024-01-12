import { BusinessesDrawer } from '@/features/businesses';
import { Map } from '@/features/map';
import Box from '@mui/material/Box';

export function Home() {
  return (
    <Box display="flex">
      <BusinessesDrawer />
      <Box height="100vh" flex={1}>
        <Map />
      </Box>
    </Box>
  );
}
