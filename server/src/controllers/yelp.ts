import fetch from 'cross-fetch';
import { Request, Response } from 'express';

const getYelpQueryString = (req: Request) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.perPage) || 25;
  const city = req.query.city;
  const queryOptions = {
    location: city,
    radius: '40000',
    sort_by: 'best_match',
    limit,
    offset: (page - 1) * limit,
  };

  const queryString = Object.entries(queryOptions)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryString;
};

export async function handleYelpApi(req: Request, res: Response) {
  const queryString = getYelpQueryString(req);
  const url = `https://api.yelp.com/v3/businesses/search?${queryString}`;
  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${process.env.YELP_API_KEY!}`,
      },
    });
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
}
