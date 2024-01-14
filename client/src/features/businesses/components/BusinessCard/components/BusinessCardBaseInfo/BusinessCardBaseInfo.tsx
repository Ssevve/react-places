import { Price } from '@/features/businesses';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessCardPriceRating } from '../BusinessCardPriceRating';
import { BusinessCardYelpStarRating } from '../BusinessCardYelpStarRating';

export interface BusinessCardBaseInfoProps {
  displayIndex: number;
  name: string;
  rating: number;
  reviewCount: number;
  isClosed: boolean;
  price: Price;
}

export function BusinessCardBaseInfo({
  displayIndex,
  name,
  rating,
  reviewCount,
  price,
  isClosed,
}: BusinessCardBaseInfoProps) {
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
      {!isClosed && price && <BusinessCardPriceRating price={price} />}
      <BusinessCardYelpStarRating rating={rating} reviewCount={reviewCount} />
    </Box>
  );
}
