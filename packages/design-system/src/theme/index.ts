import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // Dark mode colors matching the screenshot design
          primary: {
            main: '#27C6FF',
            light: '#5ddef4',
            dark: '#00acc1',
          },
          secondary: {
            main: '#FFC627',
            light: '#ffcd38',
            dark: '#ffa000',
          },
          error: {
            main: '#FF2727',
            light: '#ff5252',
            dark: '#d32f2f',
          },
          warning: {
            main: '#FFC627',
            light: '#ffcd38',
            dark: '#ffa000',
          },
          info: {
            main: '#27C6FF',
            light: '#64b5f6',
            dark: '#1976d2',
          },
          success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
          },
          background: {
            default: '#3C3F41',
            paper: '#3C3F41',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
          },
          divider: '#515151',
        }
      : {
          // Light mode colors
          primary: {
            main: '#00acc1',
            light: '#5ddef4',
            dark: '#00838f',
          },
          secondary: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
          },
          error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
          },
          warning: {
            main: '#ffa000',
            light: '#ffb74d',
            dark: '#f57c00',
          },
          background: {
            default: '#fafafa',
            paper: '#ffffff',
          },
        }),
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none',
          borderRadius: 8,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: () => ({
          padding: '8px 16px',
          fontSize: '0.875rem',
          borderBottom: mode === 'dark' ? '1px solid #515151' : '1px solid rgba(224, 224, 224, 1)',
        }),
        head: () => ({
          fontWeight: 600,
          backgroundColor: mode === 'dark' ? '#3C3F41' : '#f5f5f5',
          borderBottom: mode === 'dark' ? '1px solid #515151' : '2px solid rgba(224, 224, 224, 1)',
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: () => ({
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          },
        }),
        head: () => ({
          backgroundColor: mode === 'dark' ? '#3C3F41' : '#f5f5f5',
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: () => ({
          backgroundColor: mode === 'dark' ? '#3C3F41' : '#ffffff',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: () => ({
          borderRadius: 12,
          boxShadow:
            mode === 'dark'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode = 'dark') => {
  const tokens = getDesignTokens(mode);
  return createTheme(tokens as any);
};

export { getDesignTokens };
