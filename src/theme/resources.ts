/*
 *  Copyright (c) 2026 GTP26
 *  All rights reserved.
 */

import { pxToRem } from "../shared/utils";

/**
 * Font size scale
 * Used throughout the application for consistent typography
 */
export const fontSizes = {
  xxs: pxToRem(10), // 10px
  xs: pxToRem(12), // 12px
  sm: pxToRem(14), // 14px
  md: pxToRem(16), // 16px - body - base - 1rem
  lg: pxToRem(18), // 18px
  xl: pxToRem(20), // 20px
  xxl: pxToRem(24), // 24px
  xxxl: pxToRem(32), // 32px
} as const;

export const fontFamilies = {
  display:
    '"Be Vietnam Pro", "Lexend", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  body: '"Be Vietnam Pro", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
} as const;

/**
 * Font weight scale
 * Semantic naming for font weights
 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Spacing scale system
 * Used for gap, margin, padding throughout the application
 * Based on 8px grid system (MUI default)
 */
export const spacing = {
  xxs: 0.25, // 2px
  xs: 0.5, // 4px
  sm: 1, // 8px
  md: 2, // 16px
  lg: 2.5, // 20px
  xl: 4, // 32px
  xxl: 5, // 40px
} as const;
