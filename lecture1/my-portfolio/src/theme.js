import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:         '#252220',  /* Deep Warm Charcoal */
      light:        '#3D3A37',  /* Mid Charcoal */
      dark:         '#1A1817',  /* Near Black */
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:         '#6B6865',  /* Muted Warm Gray */
      light:        '#A09D9A',  /* Light Muted */
      dark:         '#3D3A37',  /* Mid Charcoal */
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#ECEAE6',  /* Warm Light Gray */
      paper:   '#F5F3F0',  /* Soft Cream */
    },
    text: {
      primary:   '#1A1817',  /* Near Black */
      secondary: '#6B6865',  /* Muted Warm Gray */
      disabled:  '#A09D9A',  /* Light Muted */
    },
    divider: '#D4CBC0',  /* Muted Warm */
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.15,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: '#ECEAE6' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F3F0',
          borderBottom: '1px solid #D4CBC0',
          boxShadow: 'none',
          color: '#1A1817',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#252220',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#3D3A37' },
          '&.Mui-disabled': {
            backgroundColor: '#D4CBC0',
            color: '#A09D9A',
          },
        },
        outlinedPrimary: {
          borderColor: '#252220',
          color: '#252220',
          '&:hover': {
            backgroundColor: 'rgba(37,34,32,0.06)',
            borderColor: '#252220',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#D4CBC0' },
      },
    },
  },
});

export default theme;
