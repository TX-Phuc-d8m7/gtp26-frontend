/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const fallbackStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const styles = {
  fallbackStyles,
} as const;
