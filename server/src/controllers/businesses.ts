import { Request, Response } from 'express';
import { env } from '../../config/env';
import { businessesSearchResponseSchema } from '../schemas';
import { BusinessesSearchQueryParams } from '../types';
import { calculateValidRadius } from '../utils/calculateValidRadius';
import { transformBusinessesSearchResponse } from '../utils/transformBusinessesSearchResponse';

const DEFAULT_BUSINESSES_PER_PAGE = 25;
const DEFAULT_PAGE = 1;
const DEFAULT_SORT = 'best_match';

export async function getBusinesses(
  req: Request<{}, {}, {}, BusinessesSearchQueryParams>,
  res: Response,
) {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const limit = Number(req.query.perPage) || DEFAULT_BUSINESSES_PER_PAGE;
  const offset = (page - 1) * limit;
  const radius = calculateValidRadius(Number(req.query.radius));
  const sort = req.query.sort || DEFAULT_SORT;

  try {
    const url = new URL(env.YELP_BUSINESSES_SEARCH_ENDPOINT);
    url.searchParams.set('location', req.query.city || '');
    url.searchParams.set('sort_by', sort);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('offset', offset.toString());
    url.searchParams.set('radius', radius.toString());
    req.query.price && url.searchParams.set('price', req.query.price);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${env.YELP_API_KEY}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const businessesSearchData = businessesSearchResponseSchema.parse(await response.json());

    res.status(response.status).json(
      transformBusinessesSearchResponse({
        data: businessesSearchData,
        businessesPerPage: limit,
        page,
      }),
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
    throw err;
  }
}
