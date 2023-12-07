import { useBusinessesQuery } from '@/features/businesses';
import L from 'leaflet';
import { TileLayer, ZoomControl } from 'react-leaflet';
import { BusinessMarker } from '../BusinessMarker';
import { MapWrapper, StyledMap } from './Map.styles';

export function Map() {
  const { data: businesses } = useBusinessesQuery();

  const GDANSK_COORDS: L.LatLngExpression = [54.35, 18.65];
  const SOUTH_WEST_BOUNDS: L.LatLngExpression = [49.0, 14.08];
  const NORTH_EAST_BOUNDS: L.LatLngExpression = [54.86, 24.15];
  return (
    <MapWrapper data-testid="map">
      <StyledMap
        center={GDANSK_COORDS}
        minZoom={8}
        zoom={12}
        maxBounds={[SOUTH_WEST_BOUNDS, NORTH_EAST_BOUNDS]}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businesses?.businesses.map((business, index) => {
          return <BusinessMarker key={business.id} business={business} displayIndex={index + 1} />;
        })}
      </StyledMap>
    </MapWrapper>
  );
}
