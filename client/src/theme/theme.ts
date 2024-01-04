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

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    neutral: Palette['primary'];
  }
}

export let theme = createTheme({
  breakpoints: {
    values: {
      md: 768,
      sm: 450,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  },
  palette: {
    primary: {
      main: '#f40d15',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    neutral: theme.palette.augmentColor({
      color: {
        main: '#d3d3d3',
      },
      name: 'neutral',
    }),
  },
});
