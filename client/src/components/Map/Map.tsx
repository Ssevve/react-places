import { useBusinessesQuery } from '@/features/businesses';
import L from 'leaflet';
import { useMemo } from 'react';
import { TileLayer, ZoomControl } from 'react-leaflet';
import { BusinessMarker } from '../BusinessMarker';
import { CenterExtendedBusiness } from '../CenterExtendedBusiness';
import { MapWrapper, StyledMap } from './Map.styles';

interface MapProps {
  toggleHoveredBusiness: (id: string) => void;
  hoveredBusinessId: string | undefined;
  expandedBusinessId: string | undefined;
}

export function Map({ toggleHoveredBusiness, hoveredBusinessId, expandedBusinessId }: MapProps) {
  const { data: businesses } = useBusinessesQuery();

  const expandedBusinessCoords = useMemo(
    () => businesses?.businesses.find(({ id }) => id === expandedBusinessId)?.coordinates,
    [expandedBusinessId, businesses?.businesses],
  );

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
          return (
            <BusinessMarker
              toggleHoveredBusiness={toggleHoveredBusiness}
              isHovered={hoveredBusinessId === business.id}
              isExpanded={expandedBusinessId === business.id}
              key={business.id}
              business={business}
              displayIndex={index + 1}
            />
          );
        })}
        <CenterExtendedBusiness
          latitude={expandedBusinessCoords?.latitude}
          longitude={expandedBusinessCoords?.longitude}
        />
      </StyledMap>
    </MapWrapper>
  );
}
