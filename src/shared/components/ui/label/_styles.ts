/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

export const labelStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 600,
  userSelect: "none",
  "&[data-disabled='true']": {
    pointerEvents: "none",
    opacity: 0.5,
  },
});

export const styles = {
  labelStyles,
} as const;
