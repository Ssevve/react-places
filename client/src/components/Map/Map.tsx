import { LatLngExpression } from 'leaflet';
import { TileLayer, ZoomControl } from 'react-leaflet';
import { MapWrapper, StyledMap } from './Map.styles';

export function Map() {
  const GDANSK_COORDS: LatLngExpression = [54.35, 18.65];
  const SOUTH_WEST_BOUNDS: LatLngExpression = [49.0, 14.08];
  const NORTH_EAST_BOUNDS: LatLngExpression = [54.86, 24.15];
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
      </StyledMap>
    </MapWrapper>
  );
}
