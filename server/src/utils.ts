import { radiusOptions } from './constants';

export function floorToNearestNumberDivisibleBy(number: number, divisor: number) {
  const floored = Math.floor(number);
  return floored - (floored % divisor);
}

export function getValidRadius(radius: number) {
  if (!radius) {
    return radiusOptions.default;
  } else if (radius > radiusOptions.max) {
    return radiusOptions.max;
  } else if (radius < radiusOptions.min) {
    return radiusOptions.min;
  } else if (radius % radiusOptions.step !== 0) {
    return floorToNearestNumberDivisibleBy(radius, radiusOptions.step);
  }
  return radius;
}
