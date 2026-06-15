/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { CSSProperties } from "react";
import type { Theme } from "@mui/material/styles";

// Styles dùng chung với login
export {
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
  serverErrorBannerStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
  footerStyles,
  footerLinkStyles,
  eyeToggleButtonStyles,
} from "../login/_styles";

// ---------------------------------------------------------------------------
// Styles đặc trưng cho trang reset-password
// ---------------------------------------------------------------------------

export const tokenNoticeStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #fed7aa",
  backgroundColor: "#fff7ed",
  padding: "0.625rem 0.75rem",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "#c2410c",
  lineHeight: 1.5,
  ".dark &": {
    borderColor: "rgba(253,186,116,0.25)",
    backgroundColor: "rgba(124,45,18,0.25)",
    color: "#fdba74",
  },
});

export const invalidTokenStyles = (theme: Theme) => ({
  textAlign: "center",
  padding: "1.5rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
});

export const invalidTokenIconStyles = (theme: Theme) => ({
  color: "#ef4444",
  marginBottom: "0.25rem",
});

export const invalidTokenTitleStyles = (theme: Theme) => ({
  fontSize: "1rem",
  fontWeight: 700,
  color: "var(--foreground)",
});

export const invalidTokenDescStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  color: "var(--muted-foreground)",
  lineHeight: 1.5,
});

export const backLinkStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--muted-foreground)",
  textDecoration: "none",
  transition: "color 150ms ease",
  "&:hover": {
    color: "var(--foreground)",
  },
});

export const passwordStrengthStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  color: "var(--muted-foreground)",
  lineHeight: 1.6,
  marginTop: "0.25rem",
});
