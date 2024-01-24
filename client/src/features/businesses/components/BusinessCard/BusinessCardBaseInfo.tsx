import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BusinessCardPriceRating } from './BusinessCardPriceRating';
import { BusinessCardYelpStarRating } from './BusinessCardYelpStarRating';

export interface BusinessCardBaseInfoProps {
  displayIndex: number;
  name: string;
  isClosed: boolean;
  price: number;
  rating: number;
  reviewCount: number;
}

export function BusinessCardBaseInfo({
  displayIndex,
  name,
  isClosed,
  price,
  rating,
  reviewCount,
}: BusinessCardBaseInfoProps) {
  return (
    <Box
      data-testid="business-card-base-info"
      display="flex"
      flexDirection="column"
      gap={1}
      alignItems="flex-start"
    >
      <Typography component="h3" fontWeight={700}>
        {`${displayIndex}. ${name}`}
      </Typography>
      {isClosed ? (
        <Typography component="span" variant="caption" fontWeight={700} color="primary.main">
          Permanently Closed
        </Typography>
      ) : (
        <BusinessCardPriceRating price={price} />
      )}
      <BusinessCardYelpStarRating rating={rating} reviewCount={reviewCount} />
    </Box>
  );
}
