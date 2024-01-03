import { BusinessMarker, useBusinessesQuery } from '@/features/businesses';
import { Box, styled } from '@mui/material';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import {
  HIGHLIGHTED_BUSINESS_MAP_ZOOM,
  INITIAL_MAP_CENTER,
  INITIAL_MAP_ZOOM,
  MIN_MAP_ZOOM,
  POLAND_NORTH_EAST_BOUNDS,
  POLAND_SOUTH_WEST_BOUNDS,
} from '../../constants';
import { useMapCenter } from '../../hooks';
import { CenterView } from '../CenterView';

export const StyledMap = styled(MapContainer)({
  height: '100%',
  width: '100%',
});

export interface MapProps {
  highlightedBusinessId: string | undefined;
}

export function Map({ highlightedBusinessId }: MapProps) {
  const { data: businessesData } = useBusinessesQuery();
  const { center, isBusinessHighlighted } = useMapCenter({ businessesData, highlightedBusinessId });

  return (
    <Box height="100%" width="100%" data-testid="map">
      <StyledMap
        center={INITIAL_MAP_CENTER}
        minZoom={MIN_MAP_ZOOM}
        zoom={INITIAL_MAP_ZOOM}
        maxBounds={[POLAND_SOUTH_WEST_BOUNDS, POLAND_NORTH_EAST_BOUNDS]}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businessesData?.businesses.map((business) => {
          return (
            <BusinessMarker
              isHighlighted={highlightedBusinessId === business.id}
              key={business.id}
              business={business}
            />
          );
        })}
        <CenterView
          center={center}
          zoom={isBusinessHighlighted ? HIGHLIGHTED_BUSINESS_MAP_ZOOM : 12}
        />
      </StyledMap>
    </Box>
  );
}
