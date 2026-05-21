/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

export const passwordInputWrapperStyles = (theme: Theme) => ({
  position: "relative",
  width: "100%",
});

export const passwordInputStyles = (theme: Theme) => ({
  paddingRight: "2.75rem",
});

export const passwordInputToggleStyles = (theme: Theme) => ({
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  minHeight: "auto",
  width: 42,
  padding: 0,
  borderRadius: "0 10px 10px 0",
  boxShadow: "none",
  color: "var(--muted-foreground)",
  "&:hover": {
    backgroundColor: "transparent",
    color: "var(--foreground)",
    transform: "none",
  },
});

export const passwordInputIconStyles = (theme: Theme) => ({
  height: 16,
  width: 16,
});

export const screenReaderOnlyStyles = (theme: Theme) => ({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const passwordInputBrowserToggleStyles = `
  .hide-password-toggle::-ms-reveal,
  .hide-password-toggle::-ms-clear {
    visibility: hidden;
    pointer-events: none;
    display: none;
  }
`;

export const styles = {
  passwordInputWrapperStyles,
  passwordInputStyles,
  passwordInputToggleStyles,
  passwordInputIconStyles,
  screenReaderOnlyStyles,
  passwordInputBrowserToggleStyles,
} as const;
