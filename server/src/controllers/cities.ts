import { Request, Response } from 'express';

const countryWhitelist = [
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'Czech Republic',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'Hong Kong',
  'Ireland',
  'Italy',
  'Japan',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Philippines',
  'Poland',
  'Portugal',
  'Republic of Ireland',
  'Singapore',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'The Netherlands',
  'Turkey',
  'United Kingdom',
  'United States',
];

// try out different api
// https://api-ninjas.com/api/city
export async function getCities(req: Request, res: Response) {
  const query = (req.query.q as string) || '';
  try {
    const url = new URL(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete`);
    url.searchParams.set('apikey', process.env.CITIES_API_KEY!);
    url.searchParams.set('q', query);
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const filteredCities = data.filter(
      (city: any) => city.Type === 'City' && countryWhitelist.includes(city.Country.LocalizedName),
    );

    // API returns duplicated entries. Remove them.
    const uniqueCities = filteredCities.reduce((acc: any, city: any) => {
      if (
        !acc.some(
          (obj: any) =>
            obj.Country.LocalizedName === city.Country.LocalizedName &&
            city.LocalizedName === obj.LocalizedName,
        )
      ) {
        acc.push(city);
      }
      return acc;
    }, []);

    res.json(uniqueCities);
  } catch (err) {
    console.log(err);
    if (err instanceof Error) res.json({ error: err });
  }
}
