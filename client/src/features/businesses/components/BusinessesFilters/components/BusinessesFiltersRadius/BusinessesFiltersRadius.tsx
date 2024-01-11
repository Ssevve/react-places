import { radiusOptions } from '@/features/businesses';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { floorToNearestDivisibleBy } from './utils';

function formatRadiusLabelText(radius: number) {
  return `${radius / 1000}km`;
}

export interface BusinessesFiltersRadiusProps {
  radius: number;
  setRadius: (radius: number) => void;
}

export function BusinessesFiltersRadius({ radius, setRadius }: BusinessesFiltersRadiusProps) {
  const onRadiusChange = (_: Event, radius: number | Array<number>) => {
    if (Array.isArray(radius)) return;
    else setRadius(radius);
  };

  return (
    <Box>
      <Typography component="h3" variant="subtitle1" fontWeight={500}>
        Radius
      </Typography>
      <Slider
        sx={{ display: 'block', mx: 'auto', pt: 2, width: '85%' }}
        onChange={onRadiusChange}
        getAriaValueText={(radius) => formatRadiusLabelText(radius)}
        aria-label="Radius"
        value={floorToNearestDivisibleBy(radius, radiusOptions.step)}
        valueLabelDisplay="auto"
        step={radiusOptions.step}
        marks
        min={radiusOptions.min}
        max={radiusOptions.max}
      />
    </Box>
  );
}
