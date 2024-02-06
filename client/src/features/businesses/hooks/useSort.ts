import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SortOption {
  label: string;
  value: string;
}

const sortOptions: Array<SortOption> = [
  {
    label: 'Best match',
    value: 'best_match',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
  {
    label: 'Review Count',
    value: 'review_count',
  },
  {
    label: 'Distance',
    value: 'distance',
  },
] as const;

const DEFAULT_SORT_OPTION = sortOptions[0];

export function useSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || DEFAULT_SORT_OPTION.value);

  const handleSortChange = (e: SelectChangeEvent) => {
    const sort = e.target.value;
    setSort(sort);

    if (sort === DEFAULT_SORT_OPTION.value) searchParams.delete('sort');
    else searchParams.set('sort', sort);

    searchParams.delete('page');
    setSearchParams(searchParams, { replace: true });
  };

  return { handleSortChange, sort, sortOptions };
}
