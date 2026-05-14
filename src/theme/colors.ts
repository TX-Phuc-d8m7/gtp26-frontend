/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { alpha } from "@mui/material";

// Base color palettes (primitives) - defined first for reference
const baseColors = {
  gray: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    500: "#71717A",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },
  brand: {
    50: "#FFF4E8",
    100: "#FFE4C2",
    200: "#FFC987",
    300: "#FFB25C",
    400: "#FF8A1F",
    500: "#FF6B00",
    600: "#D9480F",
    700: "#B52F08",
    800: "#8F2209",
    900: "#5F180A",
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
    50: "#FFF4E8",
    100: "#FFE4C2",
    300: "#FFB25C",
    500: "#FF8A1F",
    700: "#B52F08",
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
    gradient: `linear-gradient(135deg, ${baseColors.brand[300]} 0%, ${baseColors.brand[500]} 54%, ${baseColors.brand[600]} 100%)`,
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
      main: `linear-gradient(135deg, ${baseColors.brand[300]} 0%, ${baseColors.brand[500]} 54%, ${baseColors.brand[600]} 100%)`,
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
    placeholder: "#A1A1AA",
  },
  /**
   * Component-specific colors
   * Only for components that need unique colors not covered by semantic tokens
   */
  components: {
    body: {
      bg: `radial-gradient(circle at top left, ${alpha(
        baseColors.brand[400],
        0.12,
      )}, transparent 34%), linear-gradient(180deg, #FFFFFF 0%, ${baseColors.gray[50]} 48%, ${baseColors.broth[50]} 100%)`,
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
    backgroundWarm: "#FFFFFF",
    backgroundDeep: "#09090B",
    surface: "#FFFFFF",
    surfaceDark: "#18181B",
    herb: baseColors.herb[500],
    broth: baseColors.broth[500],
    chilli: baseColors.brand[600],
    accentGradient: `linear-gradient(135deg, ${baseColors.brand[300]} 0%, ${baseColors.brand[500]} 54%, ${baseColors.brand[600]} 100%)`,
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
