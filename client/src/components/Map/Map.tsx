import { BusinessMarker } from '@/components/BusinessMarker';
import { useBusinessesQuery } from '@/features/businesses';
import { Box, styled } from '@mui/material';
import L from 'leaflet';
import { useMemo } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { CenteredBusiness } from '../CenteredBusiness';
import { useSearchParams } from 'react-router-dom';

export const StyledMap = styled(MapContainer)({
  height: '100%',
  width: '100%',
});

export interface MapProps {
  centeredBusinessId: string | undefined;
  clearCenteredBusiness: () => void;
}

export function Map({ centeredBusinessId, clearCenteredBusiness }: MapProps) {
  const [searchParams] = useSearchParams();
  const currenPage = Number(searchParams.get('page')) || 1;
  const { data: businesses } = useBusinessesQuery({ page: currenPage });

  const centeredBusinessCoords = useMemo(
    () => businesses?.businesses.find(({ id }) => id === centeredBusinessId)?.coordinates,
    [centeredBusinessId, businesses?.businesses],
  );

  const GDANSK_COORDS: L.LatLngExpression = [54.35, 18.65];
  const SOUTH_WEST_BOUNDS: L.LatLngExpression = [49.0, 14.08];
  const NORTH_EAST_BOUNDS: L.LatLngExpression = [54.86, 24.15];

  return (
    <Box height="100%" width="100%" data-testid="map">
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
        {businesses?.businesses.map((business) => {
          return (
            <BusinessMarker
              isCentered={centeredBusinessId === business.id}
              key={business.id}
              business={business}
            />
          );
        })}
        <CenteredBusiness
          latitude={centeredBusinessCoords?.latitude}
          longitude={centeredBusinessCoords?.longitude}
          clearCenteredBusiness={clearCenteredBusiness}
        />
      </StyledMap>
    </Box>
  );
}
