import { priceRatings } from '@/features/businesses';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';

export interface BusinessesFiltersPriceProps {
  setPriceFilters: React.Dispatch<React.SetStateAction<string[]>>;
  priceFilters: Array<string>;
}

export function BusinessesFiltersPrice({
  priceFilters,
  setPriceFilters,
}: BusinessesFiltersPriceProps) {
  const onPriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const price = event.target.value;
    if (checked) setPriceFilters((prev) => [...prev, price]);
    else setPriceFilters((prev) => prev.filter((_price) => price !== _price));
  };

  return (
    <Box>
      <Typography component="h3" variant="subtitle1" fontWeight={500}>
        Price
      </Typography>
      <FormGroup>
        {priceRatings.map(({ label, value }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={priceFilters.includes(value.toString())}
                onChange={onPriceFilterChange}
              />
            }
            value={value}
            label={label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
