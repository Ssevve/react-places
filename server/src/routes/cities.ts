import express from 'express';
import { getCities } from '../controllers/cities';

const router = express.Router();

router.get('/', getCities);

export { router as citiesRoutes };
