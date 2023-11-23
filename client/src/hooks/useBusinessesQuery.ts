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
  review_count: z.number().optional(),
  rating: z.number().optional(),
  price: z.string().optional(),
  coordinates: coordinatesSchema,
  location: z.object({
    address1: z.string().nullable(),
    address2: z.string().nullable(),
    address3: z.string().nullable(),
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

export type Business = z.infer<typeof businessSchema>;

const businessesResponseSchema = z.object({
  businesses: z.array(businessSchema),
  total: z.number(),
  region: z.object({
    center: coordinatesSchema,
  }),
});

const fetchBusinesses = async () => {
  const res = await fetch('http://localhost:5000/yelsp');
  if (!res.ok) throw Error(`Failed to fetch businesses (${res.statusText})`);
  return businessesResponseSchema.parse(await res.json());
};

export const useBusinessesQuery = () => {
  return useQuery({
    queryFn: fetchBusinesses,
    queryKey: ['businesses'],
    staleTime: Infinity,
  });
};
