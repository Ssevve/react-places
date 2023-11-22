import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export const App = () => {
  const GDANSK_COORDS: LatLngExpression = [54.35, 18.65];
  const SOUTH_WEST_BOUNDS: LatLngExpression = [49.0, 14.08];
  const NORTH_EAST_BOUNDS: LatLngExpression = [54.86, 24.15];
  return (
    <div className="flex">
      <div className="shrink-1 basis-1/5">
        <p>Place List</p>
      </div>
      <div className="h-screen flex-1">
        <MapContainer
          center={GDANSK_COORDS}
          minZoom={8}
          zoom={12}
          maxBounds={[SOUTH_WEST_BOUNDS, NORTH_EAST_BOUNDS]}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};
