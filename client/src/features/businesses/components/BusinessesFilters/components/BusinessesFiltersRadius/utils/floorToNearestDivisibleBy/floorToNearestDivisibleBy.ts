export const floorToNearestDivisibleBy = (number: number, divisor: number) => {
  const floored = Math.floor(number);
  return floored - (floored % divisor);
};
