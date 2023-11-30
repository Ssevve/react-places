import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Price } from '../../api';
import { businessConstraints, priceRatings } from '../../constants';

const getPriceRating = (price: Price) => {
  const minRating = businessConstraints.priceRating.min;
  const maxRating = businessConstraints.priceRating.max;
  if (!price || price < minRating || price > maxRating) return 0;
  return price;
};

interface BusinessPriceRatingProps {
  price: Price;
}

export function BusinessPriceRating({ price }: BusinessPriceRatingProps) {
  const rating = getPriceRating(price);

  const color = rating ? priceRatings[rating].color : '';
  const label = rating && priceRatings[rating].label;

  const iconSize = '0.5rem';

  return rating ? (
    <Box display="flex" gap="0.5rem" alignItems="center" data-testid="business-price-rating">
      <Rating
        value={rating}
        icon={<CircleIcon htmlColor={color} sx={{ fontSize: iconSize }} />}
        emptyIcon={<CircleIcon sx={{ fontSize: iconSize, opacity: 0.5 }} />}
        defaultValue={0}
        max={businessConstraints.priceRating.max}
        readOnly
      />
      <Typography component="span" fontSize={12} fontWeight="500" sx={{ color }}>
        {label}
      </Typography>
    </Box>
  ) : null;
}
