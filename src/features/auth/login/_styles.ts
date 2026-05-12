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
  padding: "0.5rem 0.75rem 0.5rem 2.5rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  "&::placeholder": {
    color: "var(--muted-foreground)",
  },
  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 2px var(--ring)`,
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export const pageShellStyles = (theme: Theme) => ({
  position: "relative",
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
  padding: {
    xs: "1rem",
    sm: "2rem",
  },
});

export const pageBackgroundStyles = (theme: Theme) => ({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  background:
    "radial-gradient(ellipse at top, color-mix(in srgb, var(--primary) 20%, transparent), var(--background), var(--background))",
});

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "28rem",
  marginInline: "auto",
  padding: "2rem",
  borderRadius: "1rem",
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  transition: "box-shadow 300ms ease",
  "&:hover": {
    boxShadow:
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
});

export const headerStyles = (theme: Theme) => ({
  textAlign: "center",
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
  gap: "1.5rem",
});

export const fieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const labelStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1rem",
  fontWeight: 500,
  color: "var(--foreground)",
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
  height: 20,
  width: 20,
});

export const inputStyles = (hasError?: boolean) => (theme: Theme) => ({
  ...inputBaseStyles(theme),
  borderColor: hasError ? "#ef4444" : "var(--input)",
  "&:focus-visible": {
    outline: "none",
    boxShadow: `0 0 0 2px ${hasError ? "#ef4444" : "var(--ring)"}`,
  },
});

export const errorTextStyles = (theme: Theme) => ({
  marginTop: "0.25rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "#ef4444",
});

export const optionsRowStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const rememberWrapperStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const checkboxStyles = (theme: Theme) => ({
  height: 16,
  width: 16,
  borderRadius: "0.25rem",
  borderColor: "var(--input)",
  accentColor: "var(--primary)",
});

export const rememberLabelStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1rem",
  fontWeight: 500,
  color: "var(--muted-foreground)",
  cursor: "pointer",
});

export const forgotLinkStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "var(--primary)",
  transition: "color 150ms ease",
  textDecoration: "none",
  "&:hover": {
    color: "color-mix(in srgb, var(--primary) 80%, transparent)",
    textDecoration: "underline",
  },
});

export const submitButtonStyles = (theme: Theme) => ({
  height: 44,
  width: "100%",
  marginTop: "0.5rem",
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

export const footerStyles = (theme: Theme) => ({
  marginTop: "2rem",
  textAlign: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const footerLinkStyles = (theme: Theme) => ({
  fontWeight: 600,
  color: "var(--primary)",
  textDecoration: "none",
  transition: "color 150ms ease",
  "&:hover": {
    color: "color-mix(in srgb, var(--primary) 80%, transparent)",
    textDecoration: "underline",
  },
});

export const styles = {
  pageShellStyles,
  pageBackgroundStyles,
  containerStyles,
  headerStyles,
  titleStyles,
  descriptionStyles,
  formStyles,
  fieldStyles,
  labelStyles,
  inputWrapperStyles,
  inputIconWrapperStyles,
  inputIconStyles,
  inputStyles,
  errorTextStyles,
  optionsRowStyles,
  rememberWrapperStyles,
  checkboxStyles,
  rememberLabelStyles,
  forgotLinkStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
  footerStyles,
  footerLinkStyles,
} as const;
