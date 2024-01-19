export const radiusOptions = {
  default: 10000,
  max: 40000,
  min: 5000,
  step: 5000,
} as const;

export const priceRatings = [
  {
    color: '#69B34C',
    label: 'Very Cheap',
    value: 1,
  },
  {
    color: '#ACB334',
    label: 'Cheap',
    value: 2,
  },
  {
    color: '#FAB733',
    label: 'Expensive',
    value: 3,
  },
  {
    color: '#FF4E11',
    label: 'Very Expensive',
    value: 4,
  },
] as const;

const possibleRatings = priceRatings.map(({ value }) => value);

export const businessConstraints = {
  priceRating: {
    max: Math.max(...possibleRatings),
    min: Math.min(...possibleRatings),
  },
} as const;

export const BUSINESSES_PER_PAGE = 25;
