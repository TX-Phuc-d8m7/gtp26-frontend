'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
    accent: Palette['primary'];
    border: string;
    input: string;
    ring: string;
    chart: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
  }
  interface PaletteOptions {
    muted?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    border?: string;
    input?: string;
    ring?: string;
    chart?: {
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(var(--primary))',
      contrastText: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      main: 'hsl(var(--secondary))',
      contrastText: 'hsl(var(--secondary-foreground))',
    },
    error: {
      main: 'hsl(var(--destructive))',
      contrastText: 'hsl(var(--destructive-foreground))',
    },
    background: {
      default: 'hsl(var(--background))',
      paper: 'hsl(var(--card))',
    },
    text: {
      primary: 'hsl(var(--foreground))',
      secondary: 'hsl(var(--muted-foreground))',
    },
    divider: 'hsl(var(--border))',

    muted: {
      main: 'hsl(var(--muted))',
      contrastText: 'hsl(var(--muted-foreground))',
    },
    accent: {
      main: 'hsl(var(--accent))',
      contrastText: 'hsl(var(--accent-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    chart: {
      1: 'hsl(var(--chart-1))',
      2: 'hsl(var(--chart-2))',
      3: 'hsl(var(--chart-3))',
      4: 'hsl(var(--chart-4))',
      5: 'hsl(var(--chart-5))',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.scrollbar-pretty': {
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
            backgroundColor: '#d1d5db',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'calc(var(--radius) - 2px)',
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
          border: '1px solid hsl(var(--border))',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)',
        },
      },
    },
  },
});

export default theme;
