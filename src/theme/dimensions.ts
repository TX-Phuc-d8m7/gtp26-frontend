/*
 *  Copyright (c) 2026 GTP26
 *  All rights reserved.
 */

/**
 * Component dimensions and sizes
 * Centralized values for consistent component sizing
 */
export const dimensions = {
  headerHeight: "152px",
  headerHeightMobile: "90px",
  // Top offset used on pages where the global Header is hidden.
  layoutOffsetWithoutHeader: "40px",
  contentMaxWidth: "1080px",
  contentMaxWidthMD: "1280px",
  contentMaxWidthLG: "1440px",
  footerHeight: "294px",
  footerHeightMobile: "504px",

  // Button and input heights
  buttonHeight: {
    small: 44, // 44px
    medium: 55, // 55px
    large: 60, // 60px
  },

  // Icon sizes
  iconSize: {
    small: 20,
    medium: 24,
    mlarge: 28, // Medium-large for close buttons
    large: 48,
    xlarge: 50,
  },

  // Avatar sizes
  avatar: {
    small: 32,
    medium: 40,
    large: 56,
  },

  breakpoints: {
    xs: 400,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;
