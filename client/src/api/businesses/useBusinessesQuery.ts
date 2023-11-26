import camelize, { Camelize } from 'camelize-ts';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string().optional(),
  url: z.string().url().optional(),
  review_count: z.number(),
  rating: z.number(),
  price: z.string().optional(),
  coordinates: coordinatesSchema,
  is_closed: z.boolean(),
  location: z.object({
    display_address: z.array(z.string()),
  }),
  display_phone: z.string(),
  categories: z
    .array(
      z.object({
        alias: z.string(),
        title: z.string(),
      }),
    )
    .optional(),
});

export type Business = Camelize<z.infer<typeof businessSchema>>;

const businessesResponseSchema = z.object({
  businesses: z.array(businessSchema),
  total: z.number(),
  region: z.object({
    center: coordinatesSchema,
  }),
});

const fetchBusinesses = async () => {
  const res = await fetch('http://localhost:5000/yelp');
  if (!res.ok) throw Error(`Failed to fetch businesses (${res.statusText})`);
  return businessesResponseSchema.parse(await res.json());
};

export function useBusinessesQuery() {
  return useQuery({
    queryFn: fetchBusinesses,
    queryKey: ['businesses'],
    staleTime: Infinity,
    select: camelize,
  });
}
