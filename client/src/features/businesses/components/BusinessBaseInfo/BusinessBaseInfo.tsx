import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessPriceRating } from '../BusinessPriceRating';
import { BusinessYelpRating } from '../BusinessYelpRating';

export interface BusinessBaseInfoProps {
  index: number;
  name: string;
  rating: number;
  reviewCount: number;
  isClosed: boolean;
  price: string | undefined;
}

export function BusinessBaseInfo({
  index,
  name,
  rating,
  reviewCount,
  price,
  isClosed,
}: BusinessBaseInfoProps) {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem" alignItems="flex-start">
      <Typography component="h3" fontWeight="bold">
        {`${index}. ${name}`}
      </Typography>
      {isClosed ? (
        <Typography component="span" variant="caption" fontWeight="bold" color="#f40d15">
          Permanently Closed
        </Typography>
      ) : (
        <BusinessPriceRating price={price} />
      )}
      <BusinessYelpRating rating={rating} reviewCount={reviewCount} />
    </Box>
  );
}