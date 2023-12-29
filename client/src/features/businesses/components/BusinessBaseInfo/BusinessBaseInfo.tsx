import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Price } from '../../types';
import { BusinessPriceRating } from '../BusinessPriceRating';
import { BusinessYelpRating } from '../BusinessYelpRating';

export interface BusinessBaseInfoProps {
  displayIndex: number;
  name: string;
  rating: number;
  reviewCount: number;
  isClosed: boolean;
  price: Price;
}

export function BusinessBaseInfo({
  displayIndex,
  name,
  rating,
  reviewCount,
  price,
  isClosed,
}: BusinessBaseInfoProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
      <Typography component="h3" fontWeight={700}>
        {`${displayIndex}. ${name}`}
      </Typography>
      {isClosed && (
        <Typography component="span" variant="caption" fontWeight={700} color="primary.main">
          Permanently Closed
        </Typography>
      )}
      {!isClosed && price && <BusinessPriceRating price={price} />}
      <BusinessYelpRating rating={rating} reviewCount={reviewCount} />
    </Box>
  );
}
