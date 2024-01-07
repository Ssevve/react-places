import { z } from 'zod';

export const YelpGetBusinessesSchema = z.object({
  query: z.object({
    city: z.string(),
    perPage: z.string().optional(),
    page: z.string().optional(),
    price: z.string().optional(),
  }),
});

export type YelpGetBusinessesQuery = z.infer<typeof YelpGetBusinessesSchema>['query'];
