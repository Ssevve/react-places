import { styled } from '@mui/material';
import { Map } from '@/components/Map';
import Paper from '@mui/material/Paper';
import { BusinessList } from '@/components/BusinessList';

const AppWrapper = styled('div')({
  display: 'flex',
  position: 'relative',
});

export const ContentWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  position: 'absolute',
  [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
    height: '700px',
    width: '400px',
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    overflow: 'auto',
  },
}));

export function App() {
  return (
    <AppWrapper>
      <Map />
      <ContentWrapper elevation={6}>
        <BusinessList />
      </ContentWrapper>
    </AppWrapper>
  );
}
