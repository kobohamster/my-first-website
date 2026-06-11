import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:         '#C9944A',  /* Gold Main — 버튼, CTA, 브랜드 심볼 */
      light:        '#E0B86A',  /* Gold Highlight — hover, 하이라이트 */
      dark:         '#A07830',  /* Gold Shadow — 누른 상태 */
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:         '#7272B0',  /* Tanzanite — 링크, 태그, 배지 */
      light:        '#9090C8',  /* Light Purple — hover */
      dark:         '#4A4A82',  /* Deep Purple — 강조 */
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F0F0F0',  /* Cool Light Gray — 메인 배경 */
      paper:   '#F2EFED',  /* Diamond White — 카드, 서피스 */
    },
    text: {
      primary:   '#1A1A2E',  /* Deep Navy */
      secondary: '#4A4A4A',  /* Dark Gray */
      disabled:  '#888888',  /* Medium Gray */
    },
    divider: '#D4D4D6',
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
        body: { backgroundColor: '#F0F0F0' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F2EFED',
          borderBottom: '1px solid #D4D4D6',
          boxShadow: 'none',
          color: '#1A1A2E',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#C9944A',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#E0B86A' },
          '&.Mui-disabled': {
            backgroundColor: '#D4D4D6',
            color: '#888888',
          },
        },
        outlinedPrimary: {
          borderColor: '#C9944A',
          color: '#C9944A',
          '&:hover': {
            backgroundColor: 'rgba(201,148,74,0.08)',
            borderColor: '#A07830',
            color: '#A07830',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#D4D4D6' },
      },
    },
  },
});

export default theme;
