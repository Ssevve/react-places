import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

interface CenterExtendedBusinessProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

export function CenterExtendedBusiness({ latitude, longitude }: CenterExtendedBusinessProps) {
  const [previousLatitude, setPreviousLatitude] = useState<number>();
  const [previousLongitude, setPreviousLongitude] = useState<number>();
  const map = useMap();

  const hasCoords = latitude && longitude;
  const coordsChanged =
    hasCoords && previousLatitude !== latitude && previousLongitude !== longitude;

  useEffect(() => {
    if (coordsChanged) {
      map.flyTo([latitude, longitude], 18, {
        easeLinearity: 1.0, // 1.0 = linear
      });

      setPreviousLatitude(latitude);
      setPreviousLongitude(longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return null;
}
