/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { alpha } from "@mui/material";

// Base color palettes (primitives) - defined first for reference
const baseColors = {
  gray: {
    50: "#FFF9F1",
    100: "#F6EADC",
    200: "#E8D6C3",
    300: "#D8BFA6",
    500: "#947C68",
    700: "#5F4A3B",
    800: "#332A24",
    900: "#1A1511",
  },
  brand: {
    50: "#FFF4E8",
    100: "#FFE1BF",
    200: "#FFC989",
    300: "#FFAD52",
    400: "#FF912B",
    500: "#F97316",
    600: "#E85D04",
    700: "#B94709",
    800: "#81380E",
    900: "#4B2410",
  },
  herb: {
    50: "#EFFAF0",
    100: "#D8F1DA",
    300: "#7CC584",
    500: "#2F8F46",
    700: "#1D5F31",
    900: "#0F321E",
  },
  broth: {
    50: "#FFFDF7",
    100: "#FFF7DF",
    300: "#F7D78A",
    500: "#D99D2B",
    700: "#8A5B17",
  },
} as const;

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
    main: baseColors.brand[500],
    gradient: `linear-gradient(135deg, ${baseColors.brand[400]} 0%, ${baseColors.brand[700]} 100%)`,
  },

  /**
   * Secondary color (for MUI theme compatibility)
   */
  secondary: {
    main: baseColors.herb[500],
    gradient: `linear-gradient(135deg, ${baseColors.herb[300]} 0%, ${baseColors.herb[700]} 100%)`,
  },

  /**
   * Button colors
   */
  backgroundButtons: {
    primary: {
      main: `linear-gradient(135deg, ${baseColors.brand[400]} 0%, ${baseColors.brand[700]} 100%)`,
    },
    secondary: {
      main: alpha(baseColors.herb[500], 0.12),
    },
    danger: {
      main: "#E90000",
    },
    warning: {
      main: baseColors.broth[500],
    },
    ghost: {
      main: alpha("#FFFFFF", 0.08),
    },
    tertiary: {
      main: baseColors.gray[700],
    },
  },

  /**
   * Status colors
   */
  normal: {
    main: "#FFF",
    bg: alpha("#FFF", 0.08),
    border: "#FFF",
  },
  error: {
    main: "#FF4444",
    bg: alpha("#FF4444", 0.08),
    border: "#FF4444",
    dark: "#d32f2f",
  },
  danger: {
    main: "#FF4444",
    bg: alpha("#FF4444", 0.08),
    border: "#FF4444",
    gradient: "linear-gradient(94deg, #E34400 0.04%, #C42700 100.04%)",
  },
  danger2: {
    main: "#E90000",
    bg: alpha("#E90000", 0.08),
    border: "#E90000",
    gradient: "linear-gradient(94deg, #E34400 0.04%, #E90000 100.04%)",
  },
  success: {
    main: baseColors.herb[500],
    bg: alpha(baseColors.herb[500], 0.12),
    approved: "rgba(52, 199, 89, 1)",
  },
  warning: {
    main: baseColors.broth[500],
    bg: alpha(baseColors.broth[500], 0.12),
  },
  metaMask: {
    main: "#F6851B",
    bg: alpha("#F6851B", 0.08),
  },

  /**
   * Text colors
   */
  text: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[700],
    disabled: baseColors.gray[300], // Disabled text
    white: "#FFFFFF",
    label: baseColors.gray[800],
  },

  /**
   * Border colors
   */
  border: {
    default: baseColors.gray[200], // Default borders
    modal: baseColors.gray[300], // Default borders
    light: "#FFFFFF", // Light borders
    disabled: baseColors.gray[300],
  },

  /**
   * Default colors for placeholders and fallbacks
   */
  default: {
    placeholder: "#B89373",
  },
  /**
   * Component-specific colors
   * Only for components that need unique colors not covered by semantic tokens
   */
  components: {
    body: {
      bg: `radial-gradient(circle at top left, ${alpha(
        baseColors.brand[400],
        0.18,
      )}, transparent 34%), linear-gradient(180deg, ${baseColors.gray[50]} 0%, #FFFFFF 48%, #FFF8EF 100%)`,
      text: baseColors.gray[900],
    },
    header: {
      bg: `linear-gradient(180deg, ${alpha(baseColors.gray[50], 0.95)} 0%, ${alpha(
        baseColors.gray[50],
        0.72,
      )} 70%, transparent 100%)`,
    },
    footer: {
      bg: baseColors.gray[900],
    },
    upcoming: {
      bg: `linear-gradient(93.83deg, ${alpha(baseColors.brand[400], 0.16)} 0.04%, ${alpha(
        baseColors.herb[500],
        0.14,
      )} 100.04%)`,
    },
  },

  food: {
    backgroundWarm: "#FFF8EF",
    backgroundDeep: "#160F0B",
    surface: "#FFFDF7",
    surfaceDark: "#211711",
    herb: baseColors.herb[500],
    broth: baseColors.broth[500],
    chilli: baseColors.brand[600],
    accentGradient: `linear-gradient(135deg, ${baseColors.brand[400]} 0%, ${baseColors.brand[700]} 58%, ${baseColors.broth[500]} 100%)`,
  },

  black: {
    black_1: "rgba(10, 10, 10, 1)",
  },

  greens: {
    neon: "rgba(0, 255, 94, 1)",
    neon_bg: "rgba(0, 255, 94, 0.1)",
  },

  red: {
    main: "#FF4842",
    bg: "rgba(255, 72, 66, 0.16)",
  },

  ranking: {
    gold: {
      main: "#FFD700",
      bg: "rgba(255, 215, 0, 0.15)",
    },
    silver: {
      main: "#C0C0C0",
      bg: "rgba(192, 192, 192, 0.15)",
    },
    bronze: {
      main: "#CD7F32",
      bg: "rgba(205, 127, 50, 0.15)",
    },
  },
} as const;
