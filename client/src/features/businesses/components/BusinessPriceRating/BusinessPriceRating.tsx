import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { businessConstraints, priceRatings } from '../../constants';

interface BusinessPriceRatingProps {
  price: number;
}

export function BusinessPriceRating({ price }: BusinessPriceRatingProps) {
  const color = priceRatings[price].color;
  const label = priceRatings[price].label;

  const iconSize = 8;

  return (
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
  );
}
