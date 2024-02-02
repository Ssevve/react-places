import { z } from 'zod';
import {
  businessSchema,
  businessesSearchResponseSchema,
  businessesSearchValidationSchema,
  citiesValidationSchema,
  citySchema,
} from './schemas';

export type Business = z.infer<typeof businessSchema>;
export type BusinessesSearchResponse = z.infer<typeof businessesSearchResponseSchema>;
export type BusinessesSearchQueryParams = z.infer<typeof businessesSearchValidationSchema>['query'];

export type CitiesQueryParams = z.infer<typeof citiesValidationSchema>['query'];
export type City = z.infer<typeof citySchema>;
