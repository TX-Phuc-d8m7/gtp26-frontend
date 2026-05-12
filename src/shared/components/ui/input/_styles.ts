/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import { effects } from "@/theme/effects";

export const inputStyles = (theme: Theme) => ({
  width: "100%",
  minWidth: 0,
  minHeight: 40,
  border: "1px solid var(--input)",
  borderRadius: effects.borderRadius.md,
  backgroundColor: "color-mix(in srgb, var(--card) 82%, transparent)",
  color: "var(--foreground)",
  padding: "0.5rem 0.75rem",
  fontSize: {
    xs: 16,
    md: 14,
  },
  lineHeight: 1.4,
  boxShadow: "0 1px 0 rgb(75 36 16 / 0.04)",
  transition:
    "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
  outline: "none",
  "&::placeholder": {
    color: "var(--muted-foreground)",
  },
  "&:focus-visible": {
    borderColor: "var(--primary)",
    boxShadow: effects.shadows.focus,
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  "&[aria-invalid='true']": {
    borderColor: "#ef4444",
    boxShadow: effects.shadows.error,
  },
  "&::selection": {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
  },
});

export const styles = {
  inputStyles,
} as const;
