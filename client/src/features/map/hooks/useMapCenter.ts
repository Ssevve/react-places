import { TransformedBusinessesResponse } from '@/features/businesses';
import L from 'leaflet';
import { useMemo } from 'react';

interface UseMapCenterProps {
  businessesData: TransformedBusinessesResponse | undefined;
  highlightedBusinessId: string | undefined;
}

export function useMapCenter({ businessesData, highlightedBusinessId }: UseMapCenterProps) {
  const cityCenterCoords = useMemo(
    () =>
      businessesData?.region.center
        ? L.latLng(businessesData.region.center.latitude, businessesData.region.center.longitude)
        : undefined,
    [businessesData?.region.center],
  );

  const highlightedBusinessCoords = useMemo(() => {
    const business = businessesData?.businesses.find(({ id }) => id === highlightedBusinessId);
    return business
      ? L.latLng(Number(business.coordinates.latitude), Number(business.coordinates.longitude))
      : undefined;
  }, [highlightedBusinessId, businessesData?.businesses]);

  return {
    center: highlightedBusinessCoords || cityCenterCoords,
    isBusinessHighlighted: !!highlightedBusinessCoords,
  };
}
