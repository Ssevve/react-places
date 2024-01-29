import express from 'express';
import { getBusinesses } from '../controllers/yelp';
import { validate } from '../middleware';
import { YelpGetBusinessesSchema } from '../schemas';

const router = express.Router();

router.get('/businesses', validate(YelpGetBusinessesSchema), getBusinesses);

export { router as yelpRoutes };
