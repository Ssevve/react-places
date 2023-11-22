import { Request, Response } from 'express';
import fetch from 'cross-fetch';

export const handleYelpApi = async (req: Request, res: Response) => {
  const baseQueryOptions = {
    location: 'Gdańsk',
    // latitude: '54.35',
    // longitude: '18.65',
    radius: '40000',
    sort_by: 'best_match',
    limit: '50',
  };
  const baseQueryString = Object.entries(baseQueryOptions)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const queryOptions = req.originalUrl.split('?')[1] || '';
  const queryOptionsString = queryOptions ? `&${queryOptions}` : '';

  const queryString = `${baseQueryString}${queryOptionsString}`;
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
};
