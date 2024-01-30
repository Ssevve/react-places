import { z } from 'zod';

export const getCitiesValidationSchema = z.object({
  query: z.object({
    query: z.string().min(3, { message: 'Minimum query length is 3 characters.' }),
  }),
});

export type GetCitiesQueryParams = z.infer<typeof getCitiesValidationSchema>['query'];
