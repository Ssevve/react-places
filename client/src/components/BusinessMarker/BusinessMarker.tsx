import { TransformedBusiness } from '@/features/businesses';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { InteractiveMarker } from '@/components/InteractiveMarker';

export interface BusinessMarkerProps {
  business: TransformedBusiness;
  isCentered: boolean;
}

export const BusinessMarker = memo(({ business, isCentered }: BusinessMarkerProps) => {
  const {
    coordinates: { latitude, longitude },
  } = business;

  return (
    <InteractiveMarker riseOnHover position={[latitude, longitude]}>
      <IconButton
        sx={{
          bottom: '-50%',
          height: 'auto',
          left: '50%',
          padding: 0,
          position: 'absolute',
          translate: '-50%',
          width: 'fit-content',
        }}
      >
        <Box position="relative">
          <RoomRoundedIcon
            sx={[
              {
                color: 'primary.main',
                fill: isCentered ? 'white' : 'currentColor',
                fontSize: 40,
                stroke: isCentered ? 'currentColor' : 'white',
                transition: 'none',
              },
            ]}
          />
          <Box
            sx={{
              aspectRatio: 1,
              backgroundColor: isCentered ? 'white' : 'primary.main',
              borderRadius: '50%',
              height: '40%',
              left: '50%',
              position: 'absolute',
              top: '15%',
              translate: '-50%',
            }}
          >
            <Typography
              component="span"
              variant="caption"
              sx={{
                color: isCentered ? 'primary.main' : 'white',
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {business.displayIndex}
            </Typography>
          </Box>
        </Box>
      </IconButton>
    </InteractiveMarker>
  );
});