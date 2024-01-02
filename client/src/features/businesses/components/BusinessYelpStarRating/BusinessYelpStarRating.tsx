import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const getYelpRatingImageName = (rating: number) => {
  const flooredRating = Math.floor(rating);
  const ratingString = rating === 0.5 ? '' : `_${flooredRating}`;
  return Number.isInteger(rating)
    ? `regular${ratingString}.png`
    : `regular${ratingString}_half.png`;
};

export interface BusinessYelpStarRatingProps {
  rating: number;
  reviewCount: number;
}

export function BusinessYelpStarRating({ rating, reviewCount }: BusinessYelpStarRatingProps) {
  const starString = rating === 0.5 || rating === 1 ? 'star' : 'stars';
  return (
    <Box display="flex" gap={1} alignItems="center">
      <img
        width={102}
        src={`/assets/yelp-stars/${getYelpRatingImageName(rating)}`}
        alt={`Yelp ${rating} ${starString}`}
      />
      <Typography component="span" fontSize={14} fontWeight={700}>
        {rating}
      </Typography>
      <Typography component="span" fontSize={12} fontWeight={500}>
        ({reviewCount} reviews)
      </Typography>
    </Box>
  );
}
