import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCities } from '../api';

export interface UseCitiesQueryProps {
  query?: string;
  delay?: number;
}

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
    enabled: !!debouncedSearchQuery,
    queryFn: () => fetchCities({ query: debouncedSearchQuery }),
    queryKey: ['cities', debouncedSearchQuery],
  });
}
