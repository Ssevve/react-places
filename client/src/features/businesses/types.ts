import { transformBusiness, transformBusinessesResponse } from './utils';
import { yelpBusinessSchema, yelpBusinessesResponseSchema } from './api';
import { z } from 'zod';

export type YelpBusiness = z.infer<typeof yelpBusinessSchema>;

export type YelpBusinessesResponse = z.infer<typeof yelpBusinessesResponseSchema>;

export type TransformedBusinessesResponse = ReturnType<typeof transformBusinessesResponse>;

export type TransformedBusiness = ReturnType<typeof transformBusiness>;
export type Category = TransformedBusiness['categories'][0];
export type Price = TransformedBusiness['price'];
