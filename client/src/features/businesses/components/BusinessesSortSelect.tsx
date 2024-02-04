import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
];

const DEFAULT_SORT_OPTION = sortOptions[0];

export function BusinessesSortSelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || DEFAULT_SORT_OPTION.value);

  const handleSortChange = (e: SelectChangeEvent) => {
    const sort = e.target.value;
    setSort(sort);

    if (sort === DEFAULT_SORT_OPTION.value) {
      setSearchParams((params) => {
        params.delete('sort');
        return params;
      });
    } else {
      searchParams.set('sort', sort);
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="sort-select-label">Sort</InputLabel>
      <Select labelId="sort-select-label" label="Sort" value={sort} onChange={handleSortChange}>
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
