/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const avatarStyles = (theme: Theme) => ({
  position: "relative",
  display: "flex",
  height: 32,
  width: 32,
  flexShrink: 0,
  overflow: "hidden",
  borderRadius: "50%",
});

export const avatarImageStyles = (theme: Theme) => ({
  aspectRatio: "1 / 1",
  height: "100%",
  width: "100%",
});

export const avatarFallbackStyles = (theme: Theme) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: "muted.main",
});

export const styles = {
  avatarStyles,
  avatarImageStyles,
  avatarFallbackStyles,
} as const;
