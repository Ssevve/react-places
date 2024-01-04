import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ResponsiveDrawer } from '@/components/ResponsiveDrawer';
import { useDeviceSizes } from '@/hooks';

interface BusinessesFiltersProps {
  isOpen: boolean;
  close: () => void;
}

export function BusinessesFilters({ isOpen, close, ...props }: BusinessesFiltersProps) {
  const { isMobile } = useDeviceSizes();
  return (
    <ResponsiveDrawer
      isMobile={isMobile}
      open={isOpen}
      variant="temporary"
      onClose={close}
      hideBackdrop
      {...props}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        paddingX={1}
        paddingY={2}
        gap={1}
      >
        <IconButton aria-label="close filters" onClick={close}>
          <CloseIcon />
        </IconButton>
        <Typography component="h2" variant="h6">
          Filters
        </Typography>
      </Box>
    </ResponsiveDrawer>
  );
}
