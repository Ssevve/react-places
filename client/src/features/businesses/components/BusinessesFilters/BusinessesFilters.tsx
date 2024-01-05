import { ResponsiveDrawer } from '@/components/ResponsiveDrawer';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

interface BusinessesFiltersProps {
  isOpen: boolean;
  close: () => void;
}

export function BusinessesFilters({ isOpen, close, ...props }: BusinessesFiltersProps) {
  return (
    <ResponsiveDrawer open={isOpen} variant="temporary" onClose={close} hideBackdrop {...props}>
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
