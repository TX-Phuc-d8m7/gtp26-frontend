/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import { styles as chatStyles } from "../../_styles";

export const stickToBottomStyles = {
  position: "relative",
  flex: 1,
  overflow: "hidden",
} as const;

export const stickyContentInnerStyles: SxProps<Theme> = {
  display: "flex",
  minHeight: "100%",
  minWidth: 0,
  flexDirection: "column",
};

export const highlightedFoodNameStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: "#ea580c",
  ".dark &": {
    color: "#fb923c",
  },
};

export const styles = {
  ...chatStyles,
  stickToBottomStyles,
  stickyContentInnerStyles,
  highlightedFoodNameStyles,
} as const;
