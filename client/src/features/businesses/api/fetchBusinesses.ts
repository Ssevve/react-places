import { env } from '@/config/env';
import { z } from 'zod';

const businessSchema = z.object({
  categories: z.array(z.string()),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  displayAddress: z.string(),
  displayIndex: z.number(),
  displayPhone: z.string().nullable(),
  id: z.string(),
  imageUrl: z.string().nullable(),
  isClosed: z.boolean(),
  name: z.string(),
  price: z.number(),
  rating: z.number(),
  reviewCount: z.number(),
  yelpUrl: z.string().nullable(),
});

export type Business = z.infer<typeof businessSchema>;
export type Category = Business['categories'][0];

const fetchBusinessesResponseSchema = z.object({
  businesses: z.array(businessSchema),
  cityCenter: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  totalBusinesses: z.number(),
});

export type FetchBusinessesResponse = z.infer<typeof fetchBusinessesResponseSchema>;

interface FetchBusinessesProps {
  searchParams: URLSearchParams;
  perPage?: number;
}

export const fetchBusinesses = async ({ searchParams }: FetchBusinessesProps) => {
  const url = `${env.VITE_BUSINESSES_API_URL}?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw Error(`Failed to fetch businesses (${res.statusText})`);
  return fetchBusinessesResponseSchema.parse(await res.json());
};
