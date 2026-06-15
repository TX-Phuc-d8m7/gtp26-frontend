/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

// Styles dùng chung với login — import trực tiếp từ login/_styles
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
} from "../login/_styles";

// ---------------------------------------------------------------------------
// Styles đặc trưng cho trang forgot-password
// ---------------------------------------------------------------------------

export const infoBannerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #bbf7d0",
  backgroundColor: "#f0fdf4",
  padding: "0.75rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#15803d",
  lineHeight: 1.5,
  ".dark &": {
    borderColor: "rgba(134,239,172,0.25)",
    backgroundColor: "rgba(20,83,45,0.25)",
    color: "#86efac",
  },
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
