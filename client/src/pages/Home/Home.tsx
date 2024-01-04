import { BusinessesDrawer } from '@/features/businesses';
import { Map } from '@/features/map';
import Box from '@mui/material/Box';
import { useState } from 'react';

export function Home() {
  const [highlightedBusinessId, setHighlightedBusinessId] = useState<string>();
  return (
    <Box display="flex">
      <BusinessesDrawer setHighlightedBusinessId={setHighlightedBusinessId} />
      <Box height="100vh" width="100%">
        <Map highlightedBusinessId={highlightedBusinessId} />
      </Box>
    </Box>
  );
}
