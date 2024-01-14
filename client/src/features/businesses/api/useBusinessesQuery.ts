import { env } from '@/config/env';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
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
  display_phone: z.string().transform((str) => (str.length ? str : undefined)),
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

interface FetchBusinessesProps {
  searchParams: URLSearchParams;
  perPage?: number;
}

const fetchBusinesses = async ({ searchParams }: FetchBusinessesProps) => {
  const url = `${env.VITE_BUSINESSES_API_URL}?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw Error(`Failed to fetch businesses (${res.statusText})`);
  return yelpBusinessesResponseSchema.parse(await res.json());
};

export interface UseBusinessesQueryProps {
  enabled?: boolean;
}

export function useBusinessesQuery({ enabled = true }: UseBusinessesQueryProps = {}) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  const page = Number(searchParams.get('page')) || 1;
  return useQuery({
    enabled: enabled && !!city,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    select: (data) => {
      return transformBusinessesResponse({
        businessesPerPage: defaultBusinessesPerPage,
        data,
        page,
      });
    },
    staleTime: Infinity,
  });
}
