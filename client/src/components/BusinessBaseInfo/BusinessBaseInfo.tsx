import { BusinessPriceRating } from '@/components/BusinessPriceRating';
import { YelpRating } from '@/components/YelpRating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BusinessBaseInfoProps {
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
      <YelpRating rating={rating} reviewCount={reviewCount} />
    </Box>
  );
}
