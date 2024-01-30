import { Request, Response } from 'express';
import { z } from 'zod';
import { env } from '../../config/env';
import { GetCitiesQueryParams } from '../schemas';

const countryWhitelist = [
  { name: 'Argentina', code: 'AR' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Canada', code: 'CA' },
  { name: 'Chile', code: 'CL' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Italy', code: 'IT' },
  { name: 'Japan', code: 'JP' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Norway', code: 'NO' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'Turkey', code: 'TR' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'United States', code: 'US' },
];

const citySchema = z.object({
  name: z.string(),
  country: z.string(),
});

type City = z.infer<typeof citySchema>;

const getCitiesResponseSchema = z.array(citySchema);

export async function getCities(req: Request<{}, {}, {}, GetCitiesQueryParams>, res: Response) {
  try {
    const url = new URL('https://api.api-ninjas.com/v1/city');
    url.searchParams.set('name', req.query.query || '');
    url.searchParams.set('limit', '30'); // min. 1, max. 30
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': env.API_NINJAS_API_KEY,
      },
    });
    const cities = getCitiesResponseSchema.parse(await response.json());

    const filteredCities = cities.filter((city) =>
      countryWhitelist.map(({ code }) => code).includes(city.country),
    );

    // API gives back duplicate entries - remove them.
    const uniqueCities = filteredCities.reduce<Array<City>>((acc, city) => {
      if (!acc.some((_city) => _city.name === city.name && _city.country === city.country)) {
        acc.push(city);
      }
      return acc;
    }, []);

    const transformedCities = uniqueCities.map(({ country: countryCode, name }) => ({
      name,
      country: countryWhitelist.find(({ code }) => countryCode === code),
    }));

    res.json(transformedCities);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) res.json({ error: err });
  }
}
