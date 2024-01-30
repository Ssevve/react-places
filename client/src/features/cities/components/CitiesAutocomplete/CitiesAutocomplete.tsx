import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { City } from '../../api';
import { useCitiesQuery } from '../../hooks';

export function CitiesAutocomplete() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('city') || '');
  const { data, isError, isLoading } = useCitiesQuery({ query: search });
  const options = search && data ? data : [];

  const changeSelectedCity = (city: City | null) => {
    if (!city) {
      setSearch('');
      setSearchParams((params) => {
        params.delete('city');
        return params;
      });
    } else {
      setSearch(city.name);
      searchParams.set('city', city.name);
      setSearchParams(searchParams, { replace: true });
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={options}
      loading={isLoading}
      noOptionsText="No cities"
      value={options.find((city) => city.name === search) || null}
      clearOnBlur={false}
      filterOptions={(x) => x}
      onChange={(_, city) => changeSelectedCity(city)}
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
          value={search}
          label="Find a city"
          onChange={(e) => setSearch(e.target.value)}
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
