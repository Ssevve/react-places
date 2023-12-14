import { yelpBusinessSchema, transformBusiness } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';

export const mockTransformedBusiness = transformBusiness(generateMock(yelpBusinessSchema), 1);
