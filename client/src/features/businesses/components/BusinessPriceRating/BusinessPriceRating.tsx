import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface PriceRating {
  color: string;
  label: string;
}

const priceRatings: Record<PropertyKey, PriceRating> = {
  1: {
    color: '#69B34C',
    label: 'Very Cheap',
  },
  2: {
    color: '#ACB334',
    label: 'Cheap',
  },
  3: {
    color: '#FAB733',
    label: 'Expensive',
  },
  4: {
    color: '#FF4E11',
    label: 'Very Expensive',
  },
};

function getRating(priceString: string | undefined, maxRating: number, minRating = 1) {
  const rating = priceString?.length;
  if (!rating || rating < minRating || rating > maxRating) return 0;
  return rating;
}

interface BusinessPriceRatingProps {
  price: string | undefined;
}

export function BusinessPriceRating({ price }: BusinessPriceRatingProps) {
  const MAX_RATING = 4;
  const rating = getRating(price, MAX_RATING);

  const color = rating && priceRatings[rating].color;
  const label = rating && priceRatings[rating].label;

  const iconSize = '0.5rem';

  return rating ? (
    <Box display="flex" gap="0.5rem" alignItems="center">
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
