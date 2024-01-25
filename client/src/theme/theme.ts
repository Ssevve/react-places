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

export let theme = createTheme();

theme = createTheme(theme, {
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
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingBlock: theme.spacing(1),
          paddingInline: theme.spacing(2),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: theme.spacing(1),
          },
          paddingBlock: theme.spacing(1),
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  },
  palette: {
    neutral: theme.palette.augmentColor({
      color: {
        main: '#d3d3d3',
      },
      name: 'neutral',
    }),
    primary: {
      main: '#f40d15',
    },
  },
});
