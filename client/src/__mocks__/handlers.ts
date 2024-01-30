import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';
import { mockYelpBusinessesResponse, mockCities } from './data';

export const handlers = [
  http.get(env.VITE_BUSINESSES_API_URL, () => HttpResponse.json(mockYelpBusinessesResponse)),
  http.get(env.VITE_CITIES_API_URL, () => HttpResponse.json(mockCities)),
];
