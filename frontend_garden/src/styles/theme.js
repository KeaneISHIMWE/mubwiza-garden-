import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest Green
      light: '#4CAF50', // Light Green
      dark: '#1B5E20', // Dark Green
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8BC34A', // Light Green
      light: '#AED581',
      dark: '#689F38',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    background: {
      default: '#F1F8E9', // Very light green
      paper: '#ffffff',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#5D5D5D',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1B5E20',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1B5E20',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#2E7D32',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#2E7D32',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#2E7D32',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#2E7D32',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: '1rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(46, 125, 50, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
