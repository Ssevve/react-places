export interface PriceRating {
  color: string;
  label: string;
}

export const priceRatings: Record<number, PriceRating> = {
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
} as const;

const possibleRatings = Object.keys(priceRatings).map(Number);

export const businessConstraints = {
  priceRating: {
    max: Math.max(...possibleRatings),
    min: Math.min(...possibleRatings),
  },
} as const;

export const businessesPerPage = 25;
