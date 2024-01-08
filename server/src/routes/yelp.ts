import express from 'express';
import { getBusinesses } from '../controllers/yelp';
import { YelpGetBusinessesSchema, validate } from '../validation';

const router = express.Router();

router.get('/businesses', validate(YelpGetBusinessesSchema), getBusinesses);

export { router as yelpRoutes };
