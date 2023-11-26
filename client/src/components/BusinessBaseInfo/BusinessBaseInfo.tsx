import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { YelpRating } from '../YelpRating';

interface BusinessBaseInfoProps {
  index: number;
  name: string;
  rating: number;
  reviewCount: number;
  isClosed: boolean;
}

export function BusinessBaseInfo({
  index,
  name,
  rating,
  reviewCount,
  isClosed,
}: BusinessBaseInfoProps) {
  return (
    <Box display="grid">
      <Typography component="h3" fontWeight="bold">
        {`${index}. ${name}`}
      </Typography>
      <YelpRating rating={rating} reviewCount={reviewCount} />
      {isClosed && (
        <Typography component="span" variant="caption" fontWeight="bold" color="#d32323">
          Permanently Closed
        </Typography>
      )}
    </Box>
  );
}
