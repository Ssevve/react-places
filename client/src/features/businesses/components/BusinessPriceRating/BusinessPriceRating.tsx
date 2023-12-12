import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Price } from '../../api';
import { businessConstraints, priceRatings } from '../../constants';

interface BusinessPriceRatingProps {
  price: Price;
}

export function BusinessPriceRating({ price }: BusinessPriceRatingProps) {
  const color = price ? priceRatings[price].color : '';
  const label = price ? priceRatings[price].label : '';

  const iconSize = 8;

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
