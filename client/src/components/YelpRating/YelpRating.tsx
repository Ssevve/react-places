interface YelpRatingProps {
  rating: number;
}
const getImageName = (rating: number) => {
  const flatRating = Math.floor(rating);
  const isInt = flatRating === rating;
  const ratingString = rating === 0.5 ? '' : `_${flatRating}`;
  return isInt ? `regular${ratingString}.png` : `regular${ratingString}_half.png`;
};

// TODO: fix half star
export function YelpRating({ rating }: YelpRatingProps) {
  return <img src={`src/assets/yelp-stars/${getImageName(rating)}`} />;
}
