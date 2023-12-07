import { Map } from '@/components/Map';
import { BusinessList, BusinessListErrorFallback } from '@/features/businesses';
import { Box, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
  const [hoveredBusinessId, setHoveredBusinessId] = useState<string>();
  const [expandedBusinessId, setExpandedBusinessId] = useState<string>();

  const { reset } = useQueryErrorResetBoundary();

  const toggleHoveredBusiness = useCallback((id: string) => {
    return setHoveredBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  const toggleExpandedBusiness = useCallback((id: string) => {
    return setExpandedBusinessId((prevId) => (prevId === id ? undefined : id));
  }, []);

  return (
    <Box display="flex" position="relative">
      <Map
        hoveredBusinessId={hoveredBusinessId}
        toggleHoveredBusiness={toggleHoveredBusiness}
        expandedBusinessId={expandedBusinessId}
      />
      <ContentWrapper elevation={6}>
        <ErrorBoundary FallbackComponent={BusinessListErrorFallback} onReset={reset}>
          <BusinessList
            expandedBusinessId={expandedBusinessId}
            toggleExpandedBusiness={toggleExpandedBusiness}
            hoveredBusinessId={hoveredBusinessId}
            toggleHoveredBusiness={toggleHoveredBusiness}
          />
        </ErrorBoundary>
      </ContentWrapper>
    </Box>
  );
}
