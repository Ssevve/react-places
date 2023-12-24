import { TransformedBusiness } from '@/features/businesses';
import { InteractiveMarker } from '@/features/map';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

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
              (theme) => ({
                fill: isCentered ? theme.palette.primary.contrastText : theme.palette.primary.main,
                fontSize: 40,
                stroke: isCentered
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
                transition: 'none',
              }),
            ]}
          />
          <Box
            sx={(theme) => ({
              aspectRatio: 1,
              backgroundColor: isCentered
                ? theme.palette.primary.contrastText
                : theme.palette.primary.main,
              borderRadius: '50%',
              height: '40%',
              left: '50%',
              position: 'absolute',
              top: '15%',
              translate: '-50%',
            })}
          >
            <Typography
              component="span"
              variant="caption"
              sx={(theme) => ({
                color: isCentered ? theme.palette.primary.main : theme.palette.primary.contrastText,
                display: 'block',
                fontSize: 12,
                fontWeight: 700,
              })}
            >
              {business.displayIndex}
            </Typography>
          </Box>
        </Box>
      </IconButton>
    </InteractiveMarker>
  );
});
