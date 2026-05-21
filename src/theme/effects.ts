/*
 *  Copyright (c) 2026 GTP26
 *  All rights reserved.
 */

/**
 * Visual effects system
 * Shadows, transitions, border radius
 */
export const effects = {
  // Border radius variants
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "18px",
    xl: "24px",
    full: "9999px",
  },

  // Transition timings
  transitions: {
    fast: "100ms ease-in",
    normal: "200ms ease-in-out",
    slow: "300ms ease-in-out",
    spring: "280ms cubic-bezier(0.2, 0.8, 0.2, 1)",
  },

  // Box shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 12px 30px rgba(75, 36, 16, 0.12)",
    lg: "0 24px 60px rgba(75, 36, 16, 0.16)",
    focus: "0 0 0 3px rgba(249, 115, 22, 0.28)",
    error: "0 0 0 2px rgba(244, 67, 54, 0.2)",
  },
} as const;
