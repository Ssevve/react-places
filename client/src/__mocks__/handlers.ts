import { http, HttpResponse } from 'msw';
import { mockYelpBusinessesResponse } from './data';

export const handlers = [
  http.get('http://localhost:5000/yelp/businesses', () =>
    HttpResponse.json(mockYelpBusinessesResponse),
  ),
];
