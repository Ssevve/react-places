import { env } from '@/config/env';
import { z } from 'zod';

export const fetchCitiesResponseSchema = z.array(
  z.object({
    AdministrativeArea: z.object({
      LocalizedName: z.string(),
    }),
    Country: z.object({
      ID: z.string(),
      LocalizedName: z.string(),
    }),
    LocalizedName: z.string(),
  }),
);

interface FetchCitiesProps {
  query: string;
}

export const fetchCities = async ({ query }: FetchCitiesProps) => {
  if (!query) return;
  const url = new URL(`${env.VITE_CITIES_API_URL}/`);
  url.searchParams.set('q', query);
  const res = await fetch(url);
  if (!res.ok) throw Error(`Failed to fetch cities (${res.statusText})`);
  return fetchCitiesResponseSchema.parse(await res.json());
};
