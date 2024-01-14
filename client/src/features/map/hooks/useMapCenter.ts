import { useBusinessesQuery } from '@/features/businesses';
import L from 'leaflet';

export function useMapCenter() {
  const { data } = useBusinessesQuery({ enabled: false });
  const regionCenter = data?.region.center;

  const cityCenterCoords = regionCenter ? L.latLng(regionCenter.latitude, regionCenter.longitude) : undefined;

  return {
    center: cityCenterCoords,
  };
}
