import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '../api';
import { useEffect, useState } from 'react';

export interface UseCitiesQueryProps {
  query?: string;
  delay?: number;
}

const transformCitiesResults = (data: any) => {
  const cities = data.filter((result: any) => result.Type === 'City');
  return cities.map((city: any) => ({
    country: {
      id: city.Country.ID,
      name: city.Country.LocalizedName,
    },
    name: city.LocalizedName,
  }));
};

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useCitiesQuery({ query = '', delay = 300 }: UseCitiesQueryProps) {
  const debouncedSearchQuery = useDebounce(query, delay);
  return useQuery({
    enabled: debouncedSearchQuery.length > 2,
    queryFn: () => fetchCities({ query: debouncedSearchQuery }),
    queryKey: ['cities', debouncedSearchQuery],
    select: transformCitiesResults,
  });
}
