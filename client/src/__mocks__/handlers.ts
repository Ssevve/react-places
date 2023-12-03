import { http, HttpResponse } from 'msw';
import { mockBusinessesResponse } from './data';

export const handlers = [
  http.get('http://localhost:5000/yelp', () => HttpResponse.json(mockBusinessesResponse)),
];
