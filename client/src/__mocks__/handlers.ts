import { mockYelpBusinessesResponse } from '@/__mocks__';
import { env } from '@/config/env';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(env.VITE_BUSINESSES_API_URL, () => HttpResponse.json(mockYelpBusinessesResponse)),
];
