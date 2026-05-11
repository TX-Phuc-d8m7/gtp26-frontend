/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

const inputBaseStyles = (theme: Theme) => ({
  display: "flex",
  height: 40,
  width: "100%",
  borderRadius: "0.375rem",
  border: "1px solid",
  backgroundColor: "var(--background)",
  padding: "0.5rem 0.75rem 0.5rem 2.25rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  "&:focus-visible": {
    outline: "none",
    boxShadow: "0 0 0 2px var(--ring)",
  },
});

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "48rem",
  marginInline: "auto",
  marginTop: "2rem",
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
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  paddingBottom: "1.5rem",
  borderBottom: "1px solid var(--border)",
});

export const backButtonStyles = (theme: Theme) => ({
  padding: "0.5rem",
  borderRadius: "9999px",
  transition: "background-color 150ms ease",
  "&:hover": {
    backgroundColor: "var(--secondary)",
  },
});

export const backIconStyles = (theme: Theme) => ({
  width: 20,
  height: 20,
  color: "var(--muted-foreground)",
});

export const titleStyles = (theme: Theme) => ({
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  fontWeight: 700,
  color: "var(--foreground)",
});

export const descriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
});

export const formStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

export const sectionTitleStyles = (theme: Theme) => ({
  marginBottom: "1rem",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  color: "var(--foreground)",
});

export const preferencesSectionStyles = (theme: Theme) => ({
  paddingTop: "2rem",
  borderTop: "1px solid var(--border)",
});

export const preferencesTitleStyles = (theme: Theme) => ({
  marginBottom: "0.25rem",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  color: "var(--foreground)",
});

export const preferencesDescriptionStyles = (theme: Theme) => ({
  marginBottom: "1.5rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const accountGridStyles = (theme: Theme) => ({
  display: "grid",
  gap: "1.5rem",
  gridTemplateColumns: {
    sm: "repeat(2, minmax(0, 1fr))",
  },
});

export const fieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const fullWidthFieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  gridColumn: {
    sm: "span 2 / span 2",
  },
});

export const labelStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "var(--foreground)",
});

export const passwordLabelStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "var(--foreground)",
});

export const optionalTextStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 400,
  color: "var(--muted-foreground)",
});

export const inputWrapperStyles = (theme: Theme) => ({
  position: "relative",
});

export const inputIconWrapperStyles = (theme: Theme) => ({
  position: "absolute",
  insetBlock: 0,
  left: 0,
  paddingLeft: "0.75rem",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  color: "var(--muted-foreground)",
});

export const inputIconStyles = (theme: Theme) => ({
  height: 16,
  width: 16,
});

export const inputStyles = (hasError?: boolean) => (theme: Theme) => ({
  ...inputBaseStyles(theme),
  borderColor: hasError ? "#ef4444" : "var(--input)",
});

export const passwordInputStyles = (theme: Theme) => ({
  ...inputBaseStyles(theme),
  borderColor: "var(--input)",
});

export const errorTextStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  color: "#ef4444",
});

export const preferenceGroupStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const actionRowStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "1.5rem",
});

export const submitButtonStyles = (theme: Theme) => ({
  height: 40,
  paddingInline: "2rem",
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
  marginRight: "0.5rem",
  height: 16,
  width: 16,
});

export const loadingIconStyles = (theme: Theme) => ({
  marginRight: "0.5rem",
  height: 16,
  width: 16,
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
  backButtonStyles,
  backIconStyles,
  titleStyles,
  descriptionStyles,
  formStyles,
  sectionTitleStyles,
  preferencesSectionStyles,
  preferencesTitleStyles,
  preferencesDescriptionStyles,
  accountGridStyles,
  fieldStyles,
  fullWidthFieldStyles,
  labelStyles,
  passwordLabelStyles,
  optionalTextStyles,
  inputWrapperStyles,
  inputIconWrapperStyles,
  inputIconStyles,
  inputStyles,
  passwordInputStyles,
  errorTextStyles,
  preferenceGroupStyles,
  actionRowStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
} as const;
