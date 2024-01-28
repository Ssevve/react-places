import { BusinessMarker, useBusinessesQuery } from '@/features/businesses';
import Box from '@mui/material/Box';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { INITIAL_MAP_CENTER, INITIAL_MAP_ZOOM, MIN_MAP_ZOOM } from '../constants';
import { useMapCenter } from '../hooks';
import { CenterView } from './CenterView';

export function Map() {
  const { data: businessesData } = useBusinessesQuery();
  const { center } = useMapCenter();

  return (
    <Box height={1} width={1} data-testid="map">
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={INITIAL_MAP_CENTER}
        minZoom={MIN_MAP_ZOOM}
        zoom={INITIAL_MAP_ZOOM}
        // maxBounds={[POLAND_SOUTH_WEST_BOUNDS, POLAND_NORTH_EAST_BOUNDS]}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businessesData?.businesses.map((business) => {
          return <BusinessMarker key={business.id} business={business} />;
        })}
        <CenterView center={center} zoom={12} />
      </MapContainer>
    </Box>
  );
}
