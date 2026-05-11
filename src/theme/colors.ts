/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { alpha } from '@mui/material'

// Base color palettes (primitives) - defined first for reference
const baseColors = {
  gray: {
    100: '#D6D6D6',
    200: '#C6C6C6',
    300: '#C2C8D6',
    500: '#5C697D',
    700: '#3A4150',
    800: '#373737',
    900: '#0D0F13',
  },
  brand: {
    50: '#00BBFF',
    100: '#1BB0F5',
    200: '#118AE6',
    300: '#007BE3',
    400: '#006AE3',
    500: '#0058DD',
    600: '#0049D6',
    700: '#003BCC',
    800: '#0030C8',
    900: '#0027C4',
  },
} as const

export const colors = {
  /**
   * Base color palettes (primitives)
   * Raw color values - foundation for semantic tokens
   */
  base: baseColors,

  /**
   * Primary color (for MUI theme compatibility)
   */
  primary: {
    main: baseColors.brand[900],
    gradient: `linear-gradient(90deg, ${baseColors.brand[400]} 0%, ${baseColors.brand[900]} 100%)`,
  },

  /**
   * Secondary color (for MUI theme compatibility)
   */
  secondary: {
    main: baseColors.brand[50],
    gradient: `linear-gradient(90deg, ${baseColors.brand[50]} 0%, ${baseColors.brand[200]} 100%)`,
  },

  /**
   * Button colors
   */
  backgroundButtons: {
    primary: {
      main: `linear-gradient(90deg, ${baseColors.brand[400]} 0%, ${baseColors.brand[900]} 100%)`,
    },
    secondary: {
      main: alpha(baseColors.brand[50], 0.08),
    },
    danger: {
      main: '#E90000',
    },
    warning: {
      main: '#FF8D28',
    },
    ghost: {
      main: alpha('#FFFFFF', 0.08),
    },
    tertiary: {
      main: '#535353',
    },
  },

  /**
   * Status colors
   */
  normal: {
    main: '#FFF',
    bg: alpha('#FFF', 0.08),
    border: '#FFF',
  },
  error: {
    main: '#FF4444',
    bg: alpha('#FF4444', 0.08),
    border: '#FF4444',
    dark: '#d32f2f',
  },
  danger: {
    main: '#FF4444',
    bg: alpha('#FF4444', 0.08),
    border: '#FF4444',
    gradient: 'linear-gradient(94deg, #E34400 0.04%, #C42700 100.04%)',
  },
  danger2: {
    main: '#E90000',
    bg: alpha('#E90000', 0.08),
    border: '#E90000',
    gradient: 'linear-gradient(94deg, #E34400 0.04%, #E90000 100.04%)',
  },
  success: {
    main: baseColors.brand[50],
    bg: alpha(baseColors.brand[50], 0.08),
    approved: 'rgba(52, 199, 89, 1)',
  },
  warning: {
    main: '#FF8D28',
    bg: alpha('#FF8D28', 0.08),
  },
  metaMask: {
    main: '#F6851B',
    bg: alpha('#F6851B', 0.08),
  },

  /**
   * Text colors
   */
  text: {
    primary: '#D6D6D6',
    secondary: '#C6C6C6',
    disabled: '#D6D6D6', // Disabled text
    white: '#FFFFFF',
    label: '#D6D6D6',
  },

  /**
   * Border colors
   */
  border: {
    default: '#4A4A4A', // Default borders
    modal: '#A0A0A0', // Default borders
    light: '#FFFFFF', // Light borders
    disabled: '#333',
  },

  /**
   * Default colors for placeholders and fallbacks
   */
  default: {
    placeholder: '#F8DADA',
  },
  /**
   * Component-specific colors
   * Only for components that need unique colors not covered by semantic tokens
   */
  components: {
    body: {
      bg: `linear-gradient(270deg, #0f1a2e 0%, #0a0a0a 25%, #0a0a0a 50%, #0a0a0a 75%, #0f1a2e 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.8) 3.85%, rgba(0, 0, 0, 0) 23.08%), linear-gradient(180deg,rgba(0, 70, 211, 0.75) 0%, rgba(0, 70, 211, 0.75) 21.37%, rgba(0, 0, 0, 0.75) 35.06%, rgba(0, 0, 0, 0.9) 66.29%), #000`,
      text: '#d6d6d6',
    },
    header: {
      bg: `linear-gradient(180deg, rgba(0, 0, 0, 0.9) 36.19%, rgba(0, 0, 0, 0.4) 74.9%, rgba(0, 0, 0, 0) 100%)`,
    },
    footer: {
      bg: '#0A0A0A',
    },
    upcoming: {
      bg: `linear-gradient(93.83deg, ${alpha(
        baseColors.brand[400],
        0.2,
      )} 0.04%, ${alpha(baseColors.brand[900], 0.2)} 100.04%)`,
    },
  },

  black: {
    black_1: 'rgba(10, 10, 10, 1)',
  },

  greens: {
    neon: 'rgba(0, 255, 94, 1)',
    neon_bg: 'rgba(0, 255, 94, 0.1)',
  },

  red: {
    main: '#FF4842',
    bg: 'rgba(255, 72, 66, 0.16)',
  },

  ranking: {
    gold: {
      main: '#FFD700',
      bg: 'rgba(255, 215, 0, 0.15)',
    },
    silver: {
      main: '#C0C0C0',
      bg: 'rgba(192, 192, 192, 0.15)',
    },
    bronze: {
      main: '#CD7F32',
      bg: 'rgba(205, 127, 50, 0.15)',
    },
  },
} as const