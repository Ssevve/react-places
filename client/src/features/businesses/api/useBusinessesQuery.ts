import { useQuery } from '@tanstack/react-query';
import camelize, { Camelize } from 'camelize-ts';
import { z } from 'zod';

const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const businessSchema = z.object({
  categories: z.array(
    z.object({
      alias: z.string(),
      title: z.string(),
    }),
  ),
  coordinates: coordinatesSchema,
  display_phone: z.string(),
  id: z.string(),
  image_url: z.string().optional(),
  is_closed: z.boolean(),
  location: z.object({
    display_address: z.array(z.string()),
  }),
  name: z.string(),
  price: z.string().optional(),
  rating: z.number(),
  review_count: z.number(),
  url: z.string().url().optional(),
});

export type Business = Camelize<z.infer<typeof businessSchema>>;
export type Category = Business['categories'][0];
export type DisplayAddress = Business['location']['displayAddress'];

const businessesResponseSchema = z.object({
  businesses: z.array(businessSchema),
  region: z.object({
    center: coordinatesSchema,
  }),
  total: z.number(),
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
    select: camelize,
    staleTime: Infinity,
    throwOnError: true,
  });
}
