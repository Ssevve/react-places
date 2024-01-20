import { businessConstraints, priceRatings } from '@/features/businesses';
import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export interface BusinessCardPriceRatingProps {
  price: number | undefined;
  isClosed: boolean;
}

export function BusinessCardPriceRating({ price, isClosed }: BusinessCardPriceRatingProps) {
  const rating = priceRatings.find(({ value }) => price === value);
  const color = rating?.color;
  const label = rating?.label;

  const iconSize = 8;

  if (isClosed) {
    return (
      <Typography component="span" variant="caption" fontWeight={700} color="primary.main">
        Permanently Closed
      </Typography>
    );
  }

  return price ? (
    <Box display="flex" gap={1} alignItems="center" data-testid="business-price-rating">
      <Rating
        value={price}
        icon={<CircleIcon htmlColor={color} sx={{ fontSize: iconSize }} />}
        emptyIcon={<CircleIcon sx={{ fontSize: iconSize, opacity: 0.5 }} />}
        defaultValue={0}
        max={businessConstraints.priceRating.max}
        readOnly
      />
      <Typography component="span" fontSize={12} fontWeight={500} sx={{ color }}>
        {label}
      </Typography>
    </Box>
  ) : null;
}
