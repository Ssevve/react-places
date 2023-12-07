import { Business } from '@/features/businesses';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { InteractiveMarker } from './InteractiveMarker';

interface BusinessMarkerProps {
  business: Business;
  displayIndex: number;
  toggleHoveredBusiness: (id: string) => void;
  isHovered: boolean;
  isExpanded: boolean;
}

export const BusinessMarker = memo(
  ({
    business,
    displayIndex,
    toggleHoveredBusiness,
    isHovered,
    isExpanded,
  }: BusinessMarkerProps) => {
    const {
      coordinates: { latitude, longitude },
    } = business;

    const isHighlighted = isExpanded || isHovered;

    return (
      <InteractiveMarker position={[latitude, longitude]}>
        <IconButton
          onMouseEnter={() => toggleHoveredBusiness(business.id)}
          onMouseLeave={() => toggleHoveredBusiness(business.id)}
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
              sx={[
                {
                  fill: 'red',
                  fontSize: '40px',
                  stroke: 'white',
                  transition: 'none',
                },
                isHighlighted && {
                  fill: 'white',
                  stroke: 'red',
                },
              ]}
              htmlColor="red"
            />
            <Box
              sx={{
                aspectRatio: 1,
                backgroundColor: isHighlighted ? 'white' : 'red',
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
                  color: isHighlighted ? 'red' : 'white',
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
  },
);
