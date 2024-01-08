import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { citiesPoland } from '../../data';

interface CitiesAutocompleteProps {
  setHighlightedBusinessId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function CitiesAutocomplete({ setHighlightedBusinessId }: CitiesAutocompleteProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || null);

  const changeSelectedCity = (city: string | null) => {
    setSelectedCity(city);
    if (!city) {
      setSearchParams((params) => {
        params.delete('city');
        return params;
      });
    } else {
      setHighlightedBusinessId(undefined);
      setSearchParams({ city }, { replace: true });
    }
  };

  return (
    <Autocomplete
      disablePortal
      value={selectedCity}
      onChange={(_, city) => changeSelectedCity(city)}
      options={citiesPoland}
      renderInput={(params) => <TextField {...params} label="Select a city" />}
      getOptionLabel={(city) => city}
    />
  );
}
