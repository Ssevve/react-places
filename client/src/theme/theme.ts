import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: true;
    md: true;
    lg: false;
    xl: false;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      md: 768,
      sm: 450,
    },
  },
  palette: {
    primary: {
      main: '#f40d15',
    },
  },
});
