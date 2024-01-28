import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useCitiesQuery } from '../../hooks';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export function CitiesAutocomplete() {
  const [search, setSearch] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isError, isLoading } = useCitiesQuery({ query: search });
  const options = data || [];

  const changeSelectedCity = (city: any) => {
    console.log(city);
    if (!city) {
      setSearchParams((params) => {
        params.delete('city');
        return params;
      });
    } else {
      searchParams.set('city', city.name);
      setSearchParams(searchParams, { replace: true });
    }
  };
  return (
    <>
      <Autocomplete
        disablePortal
        options={options}
        loading={isLoading}
        // renderOption={() => {}}
        noOptionsText="No cities"
        filterOptions={(x) => x}
        onChange={(_, city) => changeSelectedCity(city)}
        getOptionLabel={({ name, country }) => `${name}, ${country.name}`}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search}
            label="Find a city"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {isError && <p>Error</p>}
    </>
  );
}
