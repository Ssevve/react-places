import { yelpBusinessSchema, transformBusiness, businessesPerPage } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';

export const mockTransformedBusiness = transformBusiness({
  business: generateMock(yelpBusinessSchema),
  businessesPerPage,
  index: 1,
  page: 1,
});
