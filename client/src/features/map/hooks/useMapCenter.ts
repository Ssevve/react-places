import { useBusinessesQuery } from '@/features/businesses';
import L from 'leaflet';

export function useMapCenter() {
  const { data } = useBusinessesQuery({ enabled: false });

  const cityCenterCoords = data?.cityCenter
    ? L.latLng(data?.cityCenter.latitude, data?.cityCenter.longitude)
    : undefined;

  return {
    cityCenter: cityCenterCoords,
  };
}
