import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export function NotFound() {
  return (
    <Box
      display="grid"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      height="100vh"
      padding={1}
    >
      <Typography component="h1" variant="h2" fontWeight={700}>
        404
      </Typography>
      <Typography component="h2" variant="h5" fontWeight={700} color="primary.main">
        Oops!
      </Typography>
      <Typography marginBlock={4} fontWeight={500}>
        We don't have that page, but we can help you find something near you to visit.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" sx={{ mx: 'auto', width: 'fit-content' }}>
        Home page
      </Button>
    </Box>
  );
}
