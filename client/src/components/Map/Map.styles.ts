import { styled } from '@mui/material/styles';
import { MapContainer } from 'react-leaflet';

export const MapWrapper = styled('div')({
  height: '100vh',
  width: '100vw',
  zIndex: 0,
});

export const StyledMap = styled(MapContainer)({
  height: '100%',
  width: '100%',
});
