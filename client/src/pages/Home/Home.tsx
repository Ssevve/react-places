import { ContentDrawer } from '@/components/ContentDrawer';
import { Map } from '@/features/map';
import Box from '@mui/material/Box';
import { useState } from 'react';

export function Home() {
  const [centeredBusinessId, setCenteredBusinessId] = useState<string>();

  return (
    <Box display="flex">
      <ContentDrawer setCenteredBusinessId={setCenteredBusinessId} />
      <Box height="100vh" width="100%">
        <Map
          centeredBusinessId={centeredBusinessId}
          clearCenteredBusiness={() => setCenteredBusinessId(undefined)}
        />
      </Box>
    </Box>
  );
}
