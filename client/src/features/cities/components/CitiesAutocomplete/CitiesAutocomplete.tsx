import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { City } from '../../types';

interface CitiesAutocompleteProps {
  cities: Array<City>;
  search: string;
  setSearch: (search: string) => void;
  isLoading: boolean;
  isError: boolean;
  onCityChange: (city: City | null) => void;
}

export function CitiesAutocomplete({
  cities,
  search,
  setSearch,
  isLoading,
  isError,
  onCityChange,
}: CitiesAutocompleteProps) {
  return (
    <Autocomplete
      disablePortal
      options={cities}
      loading={isLoading}
      noOptionsText="No cities"
      value={cities.find((city) => city.name === search) || null}
      inputValue={search}
      onInputChange={(_, value) => setSearch(value)}
      clearOnBlur={false}
      filterOptions={(x) => x}
      onChange={(_, city) => {
        console.log('changed');
        onCityChange(city);
      }}
      getOptionLabel={({ name }) => name}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" fontWeight={500}>
                  {option.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize="small">
                  {option.country.code}, {option.country.name}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={isError}
          helperText={isError ? 'Error: Failed to load cities' : ''}
          label="Find a city"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress role="progressbar" aria-label="loading cities" size={20} />}
                {isError && <ErrorOutlineIcon aria-hidden color="error" />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
