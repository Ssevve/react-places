import { useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface CenteredBusinessProps {
  latitude: number | undefined;
  longitude: number | undefined;
  clearCenteredBusiness: () => void;
}

export function CenteredBusiness({
  latitude,
  longitude,
  clearCenteredBusiness,
}: CenteredBusinessProps) {
  const [previousLatitude, setPreviousLatitude] = useState<number>();
  const [previousLongitude, setPreviousLongitude] = useState<number>();
  const map = useMap();

  const resetCenteredBusinessState = () => {
    setPreviousLatitude(undefined);
    setPreviousLongitude(undefined);
    clearCenteredBusiness();
  };

  useMapEvents({
    drag: resetCenteredBusinessState,
    zoomanim: resetCenteredBusinessState,
  });

  const hasCoords = latitude && longitude;
  const coordsChanged =
    hasCoords && previousLatitude !== latitude && previousLongitude !== longitude;

  useEffect(() => {
    if (coordsChanged) {
      map.flyTo([latitude, longitude], 18, {
        easeLinearity: 1.0, // max 1.0 = linear
      });

      setPreviousLatitude(latitude);
      setPreviousLongitude(longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return null;
}
