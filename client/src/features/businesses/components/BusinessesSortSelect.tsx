import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSort } from '../hooks/useSort';

export function BusinessesSortSelect() {
  const { sort, handleSortChange, sortOptions } = useSort();

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="sort-select-label">Sort</InputLabel>
      <Select
        data-testid="businesses-sort-select"
        labelId="sort-select-label"
        label="Sort"
        value={sort}
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
