export const getYelpRatingImageName = (rating: number) => {
  const flooredRating = Math.floor(rating);
  const ratingString = rating === 0.5 ? '' : `_${flooredRating}`;
  return Number.isInteger(rating)
    ? `regular${ratingString}.png`
    : `regular${ratingString}_half.png`;
};
