import api from 'api';
import { Request, Response } from 'express';
import { env } from '../../config/env';
import { DEFAULT_BUSINESSES_PER_PAGE, DEFAULT_PAGE } from '../constants';
import { YelpGetBusinessesQuery } from '../schemas';
import { getValidRadius } from '../utils';

const sdk = api('@api/yelp-developers/v1.0#8e0h2zlqcimwm0');
sdk.auth(`Bearer ${env.YELP_API_KEY}`);

export async function getBusinesses(
  req: Request<{}, {}, {}, YelpGetBusinessesQuery>,
  res: Response,
) {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.perPage) || DEFAULT_BUSINESSES_PER_PAGE;

  try {
    const response = await sdk.v3_business_search({
      location: req.query.city,
      price: req.query.price,
      sort_by: 'best_match',
      limit,
      offset: (page - 1) * limit,
      radius: getValidRadius(Number(req.query.radius)),
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) res.json({ error: err });
  }
}
