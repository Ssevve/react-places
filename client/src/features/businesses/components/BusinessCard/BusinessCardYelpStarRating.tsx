import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const getYelpRatingImageName = (rating: number) => {
  if (rating === 0.5) return 'half.png';
  else return Number.isInteger(rating) ? `${rating}.png` : `${Math.floor(rating)}_half.png`;
};

export interface BusinessCardYelpStarRatingProps {
  rating: number;
  reviewCount: number;
}

export function BusinessCardYelpStarRating({ rating, reviewCount }: BusinessCardYelpStarRatingProps) {
  const starAltString = rating === 0.5 || rating === 1 ? 'star' : 'stars';
  return (
    <Box data-testid="business-card-yelp-rating" display="flex" gap={1} alignItems="center">
      <img
        width={102}
        src={`/assets/yelp-stars/medium/${getYelpRatingImageName(rating)}`}
        alt={`Yelp ${rating} ${starAltString}`}
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
