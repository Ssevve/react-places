import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const radiusOptions = {
  default: 10000,
  max: 40000,
  min: 5000,
  step: 5000,
} as const;

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prices, setPrices] = useState(searchParams.get('price')?.split(',') || []);
  const [radius, setRadius] = useState(Number(searchParams.get('radius')) || radiusOptions.default);

  const setFilters = () => {
    if (prices.length === 0) searchParams.delete('price');
    else searchParams.set('price', prices.join(','));

    if (radius) searchParams.set('radius', radius.toString());
    else searchParams.delete('radius');

    searchParams.delete('page');
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  return { prices, radius, radiusOptions, setFilters, setPrices, setRadius };
}
