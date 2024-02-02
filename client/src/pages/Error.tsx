import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Box
      display="grid"
      justifyContent="center"
      alignContent="center"
      textAlign="center"
      height="100vh"
      padding={1}
    >
      {
        <Typography component="h1" variant="h2" fontWeight={700}>
          {isRouteErrorResponse(error) ? error.status : 'Error'}
        </Typography>
      }
      <Typography component="h2" variant="h5" fontWeight={700} color="primary.main">
        Oops!
      </Typography>
      <Typography marginBlock={4} fontWeight={500}>
        {isNotFound
          ? "We don't have this page, but we can help you find something near you to visit."
          : 'No way! Something went wrong... You can go back to the home page (if it works of course).'}
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" sx={{ mx: 'auto', width: 'fit-content' }}>
        Home page
      </Button>
    </Box>
  );
}
