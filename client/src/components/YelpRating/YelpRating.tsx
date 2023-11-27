import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function getImageName(rating: number) {
  const flatRating = Math.floor(rating);
  const ratingString = rating === 0.5 ? '' : `_${flatRating}`;
  return Number.isInteger(rating)
    ? `regular${ratingString}.png`
    : `regular${ratingString}_half.png`;
}

interface YelpRatingProps {
  rating: number;
  reviewCount: number;
}

// TODO: fix half star
export function YelpRating({ rating, reviewCount }: YelpRatingProps) {
  return (
    <Box display="flex" gap="0.5rem" alignItems="center">
      <img width={102} src={`src/assets/yelp-stars/${getImageName(rating)}`} />
      <Typography component="span" fontSize={14} fontWeight="700">
        {rating}
      </Typography>
      <Typography component="span" fontSize={12} fontWeight="500">
        ({reviewCount} reviews)
      </Typography>
    </Box>
  );
}
