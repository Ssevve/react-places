import { Request, Response } from 'express';
import api from 'api';
import { YelpGetBusinessesQuery } from '../validation';

const sdk = api('@api/yelp-developers/v1.0#8e0h2zlqcimwm0');
sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);

export async function getBusinesses(
  req: Request<{}, {}, {}, YelpGetBusinessesQuery>,
  res: Response,
) {
  const location = req.query.city;
  const price = req.query.price;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.perPage) || 25;

  try {
    const response = await sdk.v3_business_search({
      location,
      price,
      radius: '40000',
      sort_by: 'best_match',
      limit,
      offset: (page - 1) * limit,
    });
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
}
