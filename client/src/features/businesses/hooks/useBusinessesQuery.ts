import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchBusinesses } from '../api';

export interface UseBusinessesQueryProps {
  enabled?: boolean;
}

export function useBusinessesQuery({ enabled = true }: UseBusinessesQueryProps = {}) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  return useQuery({
    enabled: enabled && !!city,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    staleTime: Infinity,
  });
}
