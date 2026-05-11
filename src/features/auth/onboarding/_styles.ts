/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "42rem",
  marginInline: "auto",
  padding: {
    xs: "1.5rem",
    sm: "2rem",
  },
  borderRadius: "1rem",
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
});

export const headerStyles = (theme: Theme) => ({
  marginBottom: "2rem",
});

export const titleStyles = (theme: Theme) => ({
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  fontWeight: 700,
  color: "var(--foreground)",
  marginBottom: "0.5rem",
});

export const descriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
});

export const formStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const fieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const labelStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontWeight: 600,
  color: "var(--foreground)",
});

export const optionalBadgeStyles = (theme: Theme) => ({
  borderRadius: "9999px",
  backgroundColor: "var(--secondary)",
  padding: "0.125rem 0.5rem",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 400,
  color: "var(--muted-foreground)",
});

export const fieldDescriptionStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const actionRowStyles = (theme: Theme) => ({
  display: "flex",
  gap: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid var(--border)",
});

export const skipButtonStyles = (theme: Theme) => ({
  flex: 1,
  height: 44,
  border: "1px solid var(--border)",
  borderRadius: "0.375rem",
  color: "var(--foreground)",
  transition: "background-color 150ms ease, color 150ms ease",
  "&:hover": {
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
  },
});

export const submitButtonStyles = (theme: Theme) => ({
  flex: 2,
  height: 44,
  borderRadius: "0.375rem",
  backgroundColor: "var(--primary)",
  color: "var(--primary-foreground)",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 150ms ease",
  "&:hover": {
    backgroundColor: "color-mix(in srgb, var(--primary) 90%, transparent)",
  },
  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
});

export const submitIconStyles = (theme: Theme) => ({
  marginLeft: "0.5rem",
  height: 20,
  width: 20,
});

export const loadingIconStyles = (theme: Theme) => ({
  marginRight: "0.5rem",
  height: 20,
  width: 20,
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    to: {
      transform: "rotate(360deg)",
    },
  },
});

export const styles = {
  containerStyles,
  headerStyles,
  titleStyles,
  descriptionStyles,
  formStyles,
  fieldStyles,
  labelStyles,
  optionalBadgeStyles,
  fieldDescriptionStyles,
  actionRowStyles,
  skipButtonStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
} as const;
