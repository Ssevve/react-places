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

export const businessesSearchResponseSchema = z.object({
  businesses: z.array(businessSchema),
  region: z.object({
    center: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  total: z.number(),
});

export const businessesSearchValidationSchema = z.object({
  query: z.object({
    city: z.string({
      required_error: 'City is required',
    }),
    perPage: z.string().optional(),
    page: z.string().optional(),
    price: z.string().optional(),
    radius: z.string().optional(),
    sort: z.string().optional(),
  }),
});

export const citiesValidationSchema = z.object({
  query: z.object({
    query: z.string(),
  }),
});

export const citySchema = z.object({
  name: z.string(),
  country: z.string(),
});

export const citiesResponseSchema = z.array(citySchema);
