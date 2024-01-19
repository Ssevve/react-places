import { BUSINESSES_PER_PAGE, transformBusiness, yelpBusinessSchema } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';

export const mockTransformedBusiness = transformBusiness({
  business: generateMock(yelpBusinessSchema),
  businessesPerPage: BUSINESSES_PER_PAGE,
  index: 1,
  page: 1,
});
