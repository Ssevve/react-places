import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchBusinesses } from '../api';
import { BUSINESSES_PER_PAGE } from '../constants';
import { transformBusinessesResponse } from '../utils';

export interface UseBusinessesQueryProps {
  enabled?: boolean;
}

export function useBusinessesQuery({ enabled = true }: UseBusinessesQueryProps = {}) {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city');
  const page = Number(searchParams.get('page')) || 1;
  return useQuery({
    enabled: enabled && !!city,
    queryFn: () => fetchBusinesses({ searchParams }),
    queryKey: ['businesses', searchParams.toString(), searchParams],
    select: (data) => {
      return transformBusinessesResponse({
        businessesPerPage: BUSINESSES_PER_PAGE,
        data,
        page,
      });
    },
    staleTime: Infinity,
  });
}
