import { Map } from '@/components/Map';
import { BusinessList, BusinessListErrorFallback } from '@/features/businesses';
import { styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const AppWrapper = styled('div')({
  display: 'flex',
  position: 'relative',
});

export const ContentWrapper = styled(Paper)(({ theme }) => ({
  height: '100vh',
  position: 'absolute',
  width: '100%',
  [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
    height: '700px',
    left: '1rem',
    overflow: 'auto',
    top: '1rem',
    width: '400px',
  },
}));

export function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <AppWrapper>
      <Map />
      <ContentWrapper elevation={6}>
        <ErrorBoundary FallbackComponent={BusinessListErrorFallback} onReset={reset}>
          <BusinessList />
        </ErrorBoundary>
      </ContentWrapper>
    </AppWrapper>
  );
}
