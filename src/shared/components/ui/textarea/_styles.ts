/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

export const textareaStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  minHeight: 64,
  resize: "vertical",
  border: "1px solid var(--input)",
  borderRadius: "var(--radius-md)",
  backgroundColor: "transparent",
  px: 1.5,
  py: 1,
  color: "var(--foreground)",
  font: "inherit",
  fontSize: { xs: 16, md: 14 },
  lineHeight: 1.5,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  transition:
    "border-color 160ms ease, box-shadow 160ms ease, color 160ms ease",
  outline: "none",
  "&::placeholder": {
    color: "var(--muted-foreground)",
  },
  "&:focus-visible": {
    borderColor: "var(--ring)",
    boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent)",
  },
  "&[aria-invalid='true']": {
    borderColor: "var(--destructive)",
    boxShadow:
      "0 0 0 3px color-mix(in srgb, var(--destructive) 20%, transparent)",
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const styles = {
  textareaStyles,
} as const;
