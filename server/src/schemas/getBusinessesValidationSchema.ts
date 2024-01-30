import { z } from 'zod';

export const getBusinessesValidationSchema = z.object({
  query: z.object({
    city: z.string({
      required_error: 'City is required',
    }),
    perPage: z.string().optional(),
    page: z.string().optional(),
    price: z.string().optional(),
    radius: z.string().optional(),
  }),
});

export type GetBusinessesQueryParams = z.infer<typeof getBusinessesValidationSchema>['query'];
