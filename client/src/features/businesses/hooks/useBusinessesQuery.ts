import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchBusinesses } from '../api';

interface UseBusinessesQueryProps {
  isEnabled?: boolean;
}

export function useBusinessesQuery({ isEnabled = false }: UseBusinessesQueryProps = {}) {
  const [searchParams] = useSearchParams();

  return useQuery({
    enabled: isEnabled,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    staleTime: Infinity,
  });
}
