import { ContentDrawer } from '@/components/ContentDrawer';
import { Map } from '@/components/Map';
import { Box } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  const [centeredBusinessId, setCenteredBusinessId] = useState<string>();

  return (
    <BrowserRouter>
      <Box display="flex">
        <ContentDrawer setCenteredBusinessId={setCenteredBusinessId} />
        <Box height="100vh" width="100%">
          <Map
            centeredBusinessId={centeredBusinessId}
            clearCenteredBusiness={() => setCenteredBusinessId(undefined)}
          />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
