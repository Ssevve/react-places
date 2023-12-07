import { Business } from '@/features/businesses';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { InteractiveMarker } from './InteractiveMarker';

interface BusinessMarkerProps {
  business: Business;
  displayIndex: number;
}

export function BusinessMarker({ business, displayIndex }: BusinessMarkerProps) {
  const {
    coordinates: { latitude, longitude },
  } = business;
  return (
    <InteractiveMarker position={[latitude, longitude]}>
      <IconButton
        disableRipple
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
            sx={{
              fill: 'red', // change when highlighted
              fontSize: '40px',
              stroke: 'white', // change when highlighted
              transition: 'none',
            }}
            htmlColor="red"
          />
          <Box
            sx={{
              aspectRatio: 1,
              backgroundColor: 'red', // change when highlighted
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
                color: 'white', // change when highlighted
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
              }}
            >
              {displayIndex}
            </Typography>
          </Box>
        </Box>
      </IconButton>
    </InteractiveMarker>
  );
}
