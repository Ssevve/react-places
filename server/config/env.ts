import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string(),
  YELP_CLIENT_ID: z.string(),
  YELP_API_KEY: z.string(),
  API_NINJAS_API_KEY: z.string(),
  YELP_BUSINESSES_SEARCH_ENDPOINT: z.string(),
  API_NINJAS_CITY_ENDPOINT: z.string(),
});

export const env = envSchema.parse(process.env);
