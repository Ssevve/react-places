import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getYelpRatingImageName } from './getYelpRatingImageName';

export interface BusinessYelpRatingProps {
  rating: number;
  reviewCount: number;
}

// TODO: fix half star
export function BusinessYelpRating({ rating, reviewCount }: BusinessYelpRatingProps) {
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
