/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

export const skeletonStyles = (theme: Theme) => ({
  borderRadius: "var(--radius-md)",
  backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
  animation: "skeletonPulse 1.6s ease-in-out infinite",
  "@keyframes skeletonPulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
});

export const styles = {
  skeletonStyles,
} as const;
