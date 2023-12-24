import { env } from '@/config/env';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { businessConstraints, businessesPerPage as defaultBusinessesPerPage } from '../constants';
import { transformBusinessesResponse } from '../utils';

const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const yelpBusinessSchema = z.object({
  categories: z.array(
    z.object({
      alias: z.string(),
      title: z.string(),
    }),
  ),
  coordinates: coordinatesSchema,
  display_phone: z.string(),
  id: z.string(),
  image_url: z.string().optional().nullable(),
  is_closed: z.boolean(),
  location: z.object({
    display_address: z.array(z.string()),
  }),
  name: z.string(),
  price: z
    .string()
    .min(businessConstraints.priceRating.min)
    .max(businessConstraints.priceRating.max)
    .optional(),
  rating: z.number(),
  review_count: z.number(),
  url: z.string().url().optional(),
});

export const yelpBusinessesResponseSchema = z.object({
  businesses: z.array(yelpBusinessSchema),
  region: z.object({
    center: coordinatesSchema,
  }),
  total: z.number(),
});

const fetchBusinesses = async (page: number, perPage: number) => {
  const res = await fetch(`${env.VITE_BUSINESSES_API_URL}?page=${page}&limit=${perPage}`);
  if (!res.ok) throw Error(`Failed to fetch businesses (${res.statusText})`);
  return yelpBusinessesResponseSchema.parse(await res.json());
};

export interface UseBusinessesQueryProps {
  throwOnError?: boolean;
  page?: number;
  businessesPerPage?: number;
}

export function useBusinessesQuery({
  page = 1,
  businessesPerPage = defaultBusinessesPerPage,
  throwOnError = false,
}: UseBusinessesQueryProps = {}) {
  return useQuery({
    queryFn: () => fetchBusinesses(page, businessesPerPage),
    queryKey: ['businesses', page, businessesPerPage],
    select: (data) => transformBusinessesResponse({ businessesPerPage, data, page }),
    staleTime: Infinity,
    throwOnError,
  });
}
