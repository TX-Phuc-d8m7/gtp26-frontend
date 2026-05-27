/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

export const tooltipIconButtonStyles: SxProps<Theme> = {
  width: 24,
  height: 24,
  p: 0.5,
};

export const visuallyHiddenStyles: SxProps<Theme> = {
  position: "absolute",
  width: 1,
  height: 1,
  p: 0,
  m: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export const styles = {
  tooltipIconButtonStyles,
  visuallyHiddenStyles,
} as const;
