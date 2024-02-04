import { BusinessesDrawer } from '@/features/businesses';
import { Map } from '@/features/map';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const city = searchParams.get('city');
    const shouldFetch = searchParams.get('shouldFetch');

    if (shouldFetch && !city) {
      searchParams.delete('shouldFetch');
      setSearchParams(searchParams);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex">
      <BusinessesDrawer />
      <Box height="100vh" flex={1}>
        <Map />
      </Box>
    </Box>
  );
}
