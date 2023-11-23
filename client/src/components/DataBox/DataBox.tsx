import { styled } from '@mui/material';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
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

const fetchBusinesses = async () => {
  const res = await fetch('http://localhost:5000/yelp');
  if (!res.ok) throw Error('Failed to fetch businesses.');
  const businesses = await res.json();
  return businesses;
};

export const DataBox = () => {
  const { data: businesses, isLoading } = useQuery({
    queryFn: () => fetchBusinesses(),
    queryKey: ['businesses'],
    staleTime: Infinity,
  });

  return (
    <Box elevation={6}>
      {isLoading ? <span>Loading...</span> : <Businesses businesses={businesses.businesses} />}
    </Box>
  );
};
