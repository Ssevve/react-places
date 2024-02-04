import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchBusinesses } from '../api';

export function useBusinessesQuery() {
  const [searchParams] = useSearchParams();

  const shouldFetch = !!searchParams.get('shouldFetch') && !!searchParams.get('city');

  return useQuery({
    enabled: shouldFetch,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    staleTime: Infinity,
  });
}
