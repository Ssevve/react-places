import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchBusinesses } from '../api';

interface UseBusinessesQueryProps {
  enabled?: boolean;
}

export function useBusinessesQuery({ enabled = false }: UseBusinessesQueryProps = {}) {
  const [searchParams] = useSearchParams();

  return useQuery({
    enabled,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    staleTime: Infinity,
  });
}
