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
      sm: '2px',
      md: '5px',
      lg: '110px',
      full: '9999px',
    },
  
    // Transition timings
    transitions: {
      fast: '100ms ease-in',
      normal: '200ms ease-in-out',
      slow: '300ms ease-in-out',
    },
  
    // Box shadows
    shadows: {
      none: 'none',
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      focus: '0 0 0 3px rgba(11, 135, 224, 0.5)',
      error: '0 0 0 2px rgba(244, 67, 54, 0.2)',
    },
  } as const