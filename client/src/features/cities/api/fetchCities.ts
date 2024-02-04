import { env } from '@/config/env';
import { z } from 'zod';

const citySchema = z.object({
  country: z.object({
    code: z.string(),
    name: z.string(),
  }),
  name: z.string(),
});

export type City = z.infer<typeof citySchema>;

const fetchCitiesResponseSchema = z.array(citySchema);

interface FetchCitiesProps {
  query: string;
}

export const fetchCities = async ({ query }: FetchCitiesProps) => {
  if (!query) return;
  const url = new URL(`${env.VITE_CITIES_API_URL}/`);
  url.searchParams.set('query', query);
  const res = await fetch(url);
  if (!res.ok) throw Error(`Failed to fetch cities (${res.statusText})`);
  return fetchCitiesResponseSchema.parse(await res.json());
};
