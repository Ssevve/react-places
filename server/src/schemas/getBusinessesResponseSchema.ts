import { z } from 'zod';

export const businessSchema = z.object({
  categories: z.array(
    z.object({
      title: z.string(),
    }),
  ),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  display_phone: z.string().transform((str) => (str.length ? str : undefined)),
  id: z.string(),
  image_url: z.string().optional().nullable(),
  is_closed: z.boolean(),
  location: z.object({
    display_address: z.array(z.string()),
  }),
  name: z.string(),
  price: z.string().min(1).max(4).optional(),
  rating: z.number(),
  review_count: z.number(),
  url: z.string().url().optional(),
});

export type Business = z.infer<typeof businessSchema>;

export const getBusinessesResponseSchema = z.object({
  businesses: z.array(businessSchema),
  region: z.object({
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  total: z.number(),
});

export type GetBusinessesResponse = z.infer<typeof getBusinessesResponseSchema>;
