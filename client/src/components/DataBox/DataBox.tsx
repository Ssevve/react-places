import { styled } from '@mui/material';
import { Paper } from '@mui/material';
import { Businesses } from '@/components/Businesses';

const Box = styled(Paper)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  [`@media (min-width: ${theme.breakpoints.values.sm}px)`]: {
    height: '700px',
    width: '400px',
    position: 'absolute',
    left: '1rem',
    top: '1rem',
    padding: '2rem',
    overflow: 'auto',
  },
}));

export const DataBox = () => {
  return (
    <Box elevation={6}>
      <Businesses />
    </Box>
  );
};
