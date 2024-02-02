export function floorToNearestNumberDivisibleBy(number: number, divisor: number) {
  const floored = Math.floor(number);
  return floored - (floored % divisor);
}

export function calculateValidRadius(radius: number) {
  const RADIUS_OPTIONS = {
    default: 10000,
    max: 40000,
    min: 5000,
    step: 5000,
  } as const;

  if (!radius) {
    return RADIUS_OPTIONS.default;
  } else if (radius > RADIUS_OPTIONS.max) {
    return RADIUS_OPTIONS.max;
  } else if (radius < RADIUS_OPTIONS.min) {
    return RADIUS_OPTIONS.min;
  } else if (radius % RADIUS_OPTIONS.step !== 0) {
    return floorToNearestNumberDivisibleBy(radius, RADIUS_OPTIONS.step);
  }
  return radius;
}
