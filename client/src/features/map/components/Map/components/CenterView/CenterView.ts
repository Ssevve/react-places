import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface CenterViewProps {
  center: L.LatLngExpression | undefined;
  zoom: number;
}

export function CenterView({ center, zoom }: CenterViewProps) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;
    map.flyTo(center, zoom, {
      easeLinearity: 1.0, // max 1.0 = linear
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  return null;
}
