import { floorToNearestDivisibleBy } from './floorToNearestDivisibleBy';

describe('floorToNearestDivisibleBy', () => {
  it('should work for positive numbers', () => {
    expect(floorToNearestDivisibleBy(38, 20)).toBe(20);
  });

  it('should work for negative numbers', () => {
    expect(floorToNearestDivisibleBy(-38, 20)).toBe(-20);
  });

  it('should work for floats', () => {
    expect(floorToNearestDivisibleBy(38.24, 20)).toBe(20);
  });
});
