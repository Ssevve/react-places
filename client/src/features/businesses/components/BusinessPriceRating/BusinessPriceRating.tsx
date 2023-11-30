import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Price } from '../../api';
import { priceRatings } from '../../constants';

const getRating = (price: Price, maxRating: number, minRating = 1) => {
  if (!price || price < minRating || price > maxRating) return 0;
  return price;
};

interface BusinessPriceRatingProps {
  price: Price;
}

export function BusinessPriceRating({ price }: BusinessPriceRatingProps) {
  const MAX_RATING = 4;
  const rating = getRating(price, MAX_RATING);

  const color = rating && priceRatings[rating].color;
  const label = rating && priceRatings[rating].label;

  const iconSize = '0.5rem';

  return rating ? (
    <Box display="flex" gap="0.5rem" alignItems="center" data-testid="business-price-rating">
      <Rating
        value={rating}
        icon={<CircleIcon sx={{ color, fontSize: iconSize }} />}
        emptyIcon={<CircleIcon sx={{ fontSize: iconSize, opacity: 0.5 }} />}
        defaultValue={0}
        max={MAX_RATING}
        readOnly
      />
      <Typography component="span" fontSize={12} fontWeight="500" sx={{ color }}>
        {label}
      </Typography>
    </Box>
  ) : null;
}
