import { useMediaQuery, useTheme } from '@mui/material';

export function useDeviceSizes() {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return { isMobile, isSmallMobile };
}
