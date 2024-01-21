import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';
import { mockYelpBusinessesResponse } from './data';

export const handlers = [
  http.get(env.VITE_BUSINESSES_API_URL, () => HttpResponse.json(mockYelpBusinessesResponse)),
];
