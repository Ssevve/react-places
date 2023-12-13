import { businessSchema } from '@/features/businesses';
import { generateMock } from '@anatine/zod-mock';
import camelize from 'camelize-ts';

export const mockBusiness = camelize(generateMock(businessSchema));
