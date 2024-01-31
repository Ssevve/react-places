import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';
import { mockCities, mockFetchBusinessesResponse } from './data';

export const handlers = [
  http.get(env.VITE_BUSINESSES_API_URL, () => HttpResponse.json(mockFetchBusinessesResponse)),
  http.get(env.VITE_CITIES_API_URL, () => HttpResponse.json(mockCities)),
];
