import { Request, Response } from 'express';
import { env } from '../../config/env';
import { DEFAULT_BUSINESSES_PER_PAGE, DEFAULT_PAGE } from '../constants';
import { GetBusinessesQueryParams } from '../schemas/getBusinessesValidationSchema';
import { calculateValidRadius } from '../utils/calculateValidRadius';
import { transformGetBusinessesResponse } from '../utils/transformGetBusinessesResponse';

export async function getBusinesses(
  req: Request<{}, {}, {}, GetBusinessesQueryParams>,
  res: Response,
) {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.perPage) || DEFAULT_BUSINESSES_PER_PAGE;

  try {
    const url = new URL('https://api.yelp.com/v3/businesses/search');
    url.searchParams.set('location', req.query.city || '');
    url.searchParams.set('sort_by', 'best_match');
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('offset', ((page - 1) * limit).toString());
    url.searchParams.set('radius', calculateValidRadius(Number(req.query.radius)).toString());
    req.query.price && url.searchParams.set('price', req.query.price);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.YELP_API_KEY}`,
      },
    });
    const data = await response.json();

    if (!response.ok) res.status(response.status).json({ error: data });
    else {
      res
        .status(200)
        .json(transformGetBusinessesResponse({ data, businessesPerPage: limit, page }));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
}
