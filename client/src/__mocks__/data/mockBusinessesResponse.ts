import { businessesResponseSchema } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';

const mockFromSchema = generateMock(businessesResponseSchema);

// Transform price into a string
// It generates as a number, because of transform in the zod schema and throws an error while parsing
const transformedBusinesses = mockFromSchema.businesses.map(({ price, ...rest }) => ({
  ...rest,
  price: '$'.repeat(price),
}));

export const mockBusinessesResponse = {
  ...mockFromSchema,
  businesses: transformedBusinesses,
};
