import { styled } from '@mui/material/styles';
import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

const MapWrapper = styled('div')({
  height: '100vh',
  width: '100vw',
  zIndex: 0,
});

const StyledMap = styled(MapContainer)({
  height: '100%',
  width: '100%',
});

export const Map = () => {
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
};
