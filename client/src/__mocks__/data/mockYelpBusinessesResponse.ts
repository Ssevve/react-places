import { yelpBusinessesResponseSchema } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';

export const mockYelpBusinessesResponse = generateMock(yelpBusinessesResponseSchema);
